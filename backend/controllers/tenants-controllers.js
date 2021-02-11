const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_TENANTS = [
  {
    id: "p1",
    name: "Amir Aizin",
    phoneNumber: "0501222231",
    address: "Rishon Lezion",
    debt: true,
    creator: "u1",
  },
];

const getTenantById = (req, res, next) => {
  const tenantId = req.params.pid;

  const tenants = DUMMY_TENANTS.find((p) => {
    return p.id === tenantId;
  });

  if (!tenants) {
    throw new HttpError("Could not find a tenant for the provided id.", 404);
  }

  res.json({ tenants });
};

const getTenantsByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const tenants = DUMMY_TENANTS.filter((p) => {
    return p.creator === userId;
  });

  if (!tenants || tenants.length === 0) {
    return next(
      new HttpError("Could not find tenant for the provided user id.", 404)
    );
  }

  res.json({ tenants });
};

const createTenant = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, phoneNumber, address, debt, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdTenant = {
    name,
    phoneNumber,
    debt,
    address,
    creator,
  };

  DUMMY_TENANTS.push(createdTenant);

  res.status(201).json({ tenant: createdTenant });
};

const updateTenant = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, phoneNumber, address, debt } = req.body;
  const tenantId = req.params.pid;

  const updatedTenant = { ...DUMMY_TENANTS.find((p) => p.id === tenantId) };
  const tenantIndex = DUMMY_TENANTS.findIndex((p) => p.id === tenantId);
  updatedTenant.name = name;
  updatedTenant.phoneNumber = phoneNumber;
  updatedTenant.address = address;
  updatedTenant.debt = debt;

  DUMMY_TENANTS[tenantIndex] = updatedTenant;

  res.status(200).json({ tenant: updatedTenant });
};

const deleteTenant = (req, res, next) => {
  const tenantId = req.params.pid;
  if (!DUMMY_TENANTS.find((p) => p.id === tenantId)) {
    throw new HttpError("Could not find a Tenant for that id.", 404);
  }
  DUMMY_TENANTS = DUMMY_TENANTS.filter((p) => p.id !== tenantId);
  res.status(200).json({ message: "Deleted Tenant." });
};

exports.getTenantById = getTenantById;
exports.getTenantsByUserId = getTenantsByUserId;
exports.createTenant = createTenant;
exports.updateTenant = updateTenant;
exports.deleteTenant = deleteTenant;
