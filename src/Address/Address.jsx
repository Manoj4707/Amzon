import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./Address.css";

const STORAGE_KEY = "savedAddresses";
const LEGACY_STORAGE_KEY = "savedAddress";

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

const createAddressId = (addresses = []) => {
  const ids = addresses
    .map((address) => Number(address.id))
    .filter((id) => Number.isFinite(id));

  return ids.length ? Math.max(...ids) + 1 : 1;
};

const normalizeAddress = (address = {}, fallbackId) => {
  const mobileValue = String(address.mobile ?? address.mobileNumber ?? "").trim();

  return {
    id: address.id ?? fallbackId ?? createAddressId(),
    fullName: String(address.fullName ?? "").trim(),
    mobile: mobileValue,
    mobileNumber: mobileValue,
    addressLine1: String(address.addressLine1 ?? "").trim(),
    addressLine2: String(address.addressLine2 ?? "").trim(),
    city: String(address.city ?? "").trim(),
    state: String(address.state ?? "").trim(),
    pincode: String(address.pincode ?? "").trim(),
    country: String(address.country ?? "").trim(),
  };
};

const getStoredAddresses = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawStoredAddresses = localStorage.getItem(STORAGE_KEY);
    const legacyAddress = localStorage.getItem(LEGACY_STORAGE_KEY);
    const sourceValue = rawStoredAddresses ?? legacyAddress;

    if (!sourceValue) {
      return [];
    }

    const parsedValue = JSON.parse(sourceValue);

    if (Array.isArray(parsedValue)) {
      const normalizedAddresses = parsedValue.map((entry, index) =>
        normalizeAddress(entry, index + 1)
      );

      if (rawStoredAddresses === null && legacyAddress) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedAddresses));
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }

      return normalizedAddresses;
    }

    if (parsedValue && typeof parsedValue === "object") {
      const normalizedAddresses = [normalizeAddress(parsedValue, 1)];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedAddresses));

      if (legacyAddress) {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }

      return normalizedAddresses;
    }

    return [];
  } catch {
    return [];
  }
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

const createEmptyForm = (baseAddress = {}) => ({
  ...emptyAddress,
  ...baseAddress,
});

function Address({ initialAddress = {}, onSave }) {
  const [addressData, setAddressData] = useState(() =>
    createEmptyForm(initialAddress)
  );
  const [savedAddresses, setSavedAddresses] = useState(() => getStoredAddresses());
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [locationError, setLocationError] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const resetForm = () => {
    setAddressData(createEmptyForm(initialAddress));
    setSelectedAddressId(null);
    setIsEditing(false);
    setErrors({});
  };

  const persistAddresses = (addresses) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    }
    setSavedAddresses(addresses);
    onSave?.(addresses);
  };

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

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    const normalizedAddress = normalizeAddress(
      {
        ...addressData,
        id: isEditing && selectedAddressId ? selectedAddressId : undefined,
        mobileNumber: addressData.mobileNumber,
        mobile: addressData.mobileNumber,
      },
      isEditing && selectedAddressId ? selectedAddressId : createAddressId(savedAddresses)
    );

    const nextAddresses = isEditing && selectedAddressId
      ? savedAddresses.map((address) =>
          address.id === selectedAddressId ? normalizedAddress : address
        )
      : [...savedAddresses, { ...normalizedAddress, id: createAddressId(savedAddresses) }];

    persistAddresses(nextAddresses);
    setSuccessMessage("Address saved successfully.");
    resetForm();
  };

  const handleEditAddress = (address) => {
    setIsEditing(true);
    setSelectedAddressId(address.id);
    setAddressData({
      ...emptyAddress,
      fullName: address.fullName,
      mobileNumber: address.mobileNumber || address.mobile || "",
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
    });
    setErrors({});
    setLocationError("");
    setSuccessMessage("");
  };

  const handleDeleteAddress = (addressId) => {
    const targetAddress = savedAddresses.find((address) => address.id === addressId);

    if (!targetAddress) {
      return;
    }

    const shouldDelete = window.confirm(
      "Are you sure you want to delete this saved address?"
    );

    if (!shouldDelete) {
      return;
    }

    const nextAddresses = savedAddresses.filter((address) => address.id !== addressId);

    persistAddresses(nextAddresses);

    if (selectedAddressId === addressId) {
      resetForm();
    }
  };

  return (
    <>
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

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
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
          {isEditing ? "Update Address" : "Save Address"}
        </button>
      </form>

      {savedAddresses.length > 0 && (
        <div className="mt-4">
          {savedAddresses.map((address) => (
            <div className="card p-4 mb-3" key={address.id}>
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <p className="mb-1 fw-semibold">{address.fullName}</p>
                  <p className="mb-1">{address.mobileNumber || address.mobile}</p>
                  <p className="mb-1">{address.addressLine1}</p>
                  {address.addressLine2 && <p className="mb-1">{address.addressLine2}</p>}
                  <p className="mb-1">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="mb-0">{address.country}</p>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-link p-0 text-warning"
                    onClick={() => handleEditAddress(address)}
                    aria-label="Edit address"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-danger"
                    onClick={() => handleDeleteAddress(address.id)}
                    aria-label="Delete address"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Address;
