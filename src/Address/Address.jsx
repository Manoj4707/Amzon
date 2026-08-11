import { useState } from "react";
import "./Address.css";

const emptyAddress = {
  fullName: "",
  mobileNumber: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
};

const addressFields = [
  ["fullName", "Full Name", "text", "Please enter your full name.", "col-md-6"],
  ["mobileNumber", "Mobile Number", "tel", "Please enter a valid mobile number.", "col-md-6"],
  ["addressLine1", "Address Line 1", "text", "Please enter your address.", "col-12"],
  ["addressLine2", "Address Line 2", "text", "", "col-12"],
  ["city", "City", "text", "Please enter your city.", "col-md-4"],
  ["state", "State", "text", "Please enter your state.", "col-md-4"],
  ["pincode", "Pincode", "text", "Please enter your pincode.", "col-md-4"],
  ["country", "Country", "text", "Please enter your country.", "col-12"],
];

const geolocationErrorCodes = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
};

const reverseGeocode = async ({ latitude, longitude }) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
  );

  if (!response.ok) {
    throw new Error("Unable to look up your address. Please try again.");
  }

  const location = await response.json();
  const address = location.address;

  if (!address) {
    throw new Error("Unable to look up your address. Please try again.");
  }

  return {
    addressLine1:
      [address.house_number, address.road].filter(Boolean).join(" ") ||
      location.display_name?.split(",")[0] ||
      "",
    city:
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      "",
    state: address.state || address.state_district || "",
    pincode: address.postcode || "",
    country: address.country || "",
  };
};

function Address({ initialAddress = {}, onSave }) {
  const [addressData, setAddressData] = useState({
    ...emptyAddress,
    ...initialAddress,
  });
  const [errors, setErrors] = useState({});
  const [locationError, setLocationError] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const updateAddressData = (field) => (event) => {
    setAddressData((currentData) => ({
      ...currentData,
      [field]: event.target.value,
    }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: false }));
  };

  const handleCurrentLocation = () => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Location detection is not supported by this browser.");
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const detectedAddress = await reverseGeocode(coords);
          setAddressData((currentData) => ({
            ...currentData,
            ...detectedAddress,
          }));
        } catch (error) {
          setLocationError(
            error.message || "Unable to look up your address. Please try again."
          );
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        switch (error.code) {
          case geolocationErrorCodes.PERMISSION_DENIED:
            setLocationError("Please allow location access in your browser settings.");
            break;
          case geolocationErrorCodes.POSITION_UNAVAILABLE:
            setLocationError("Your location is currently unavailable. Please try again.");
            break;
          case geolocationErrorCodes.TIMEOUT:
            setLocationError("Location request timed out. Please try again.");
            break;
          default:
            setLocationError("Unable to detect your location. Please try again.");
        }
        setIsDetectingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleSaveAddress = (event) => {
    event.preventDefault();

    const nextErrors = {
      fullName: !addressData.fullName.trim(),
      mobileNumber: !/^\d{10,15}$/.test(
        addressData.mobileNumber.replace(/[\s-]/g, "")
      ),
      addressLine1: !addressData.addressLine1.trim(),
      city: !addressData.city.trim(),
      state: !addressData.state.trim(),
      pincode: !addressData.pincode.trim(),
      country: !addressData.country.trim(),
    };

    setErrors(nextErrors);

    if (!Object.values(nextErrors).some(Boolean)) {
      onSave?.(addressData);
    }
  };

  return (
    <form className="address card p-4" onSubmit={handleSaveAddress} noValidate>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <h3 className="mb-0">Address Details</h3>
        <button
          type="button"
          className="btn btn-outline-warning"
          onClick={handleCurrentLocation}
          disabled={isDetectingLocation}
        >
          {isDetectingLocation ? "Detecting location..." : "Use My Current Location"}
        </button>
      </div>

      {locationError && (
        <div className="alert alert-danger" role="alert">
          {locationError}
        </div>
      )}

      <div className="row">
        {addressFields.map(([field, label, type, errorMessage, columnClass]) => (
          <div className={`${columnClass} mb-3`} key={field}>
            <label className="form-label" htmlFor={`address-${field}`}>
              {label}
            </label>
            <input
              id={`address-${field}`}
              type={type}
              className={`form-control ${errors[field] ? "is-invalid" : ""}`}
              value={addressData[field]}
              onChange={updateAddressData(field)}
            />
            {errors[field] && (
              <div className="invalid-feedback">{errorMessage}</div>
            )}
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-warning address-save-button">
        Save Address
      </button>
    </form>
  );
}

export default Address;
