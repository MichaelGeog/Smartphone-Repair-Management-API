import { apple, appleBrandId } from "../data/apple.js";

export const getAllDevices = (req, res) => {
  res.status(200).json(apple);
};

export const getDeviceById = (req, res) => {
  const id = Number(req.params.id);
  const foundDevice = apple.find((d) => d.deviceId === id);

  if (!foundDevice) return res.status(404).json({ error: "Device Not Found" });
  res.status(200).json(foundDevice);
};

export const createDevice = (req, res) => {
  let { model } = req.body;
  if (!model) return res.status(400).json({ error: "Model is required" });

  const normalized = model.trim().toUpperCase();

  const inDB = apple.find((d) => d.model.trim().toUpperCase() === normalized);
  if (inDB) return res.status(409).json({ error: "Device Already Exist" });

  let newDevice = {
    deviceId: apple.length + 1,
    brandId: appleBrandId.toUpperCase(),
    model: normalized,
  };

  apple.push(newDevice);
  res.status(201).json(newDevice);
};

export const updateDevice = (req, res) => {
  const id = Number(req.params.id);
  const { model } = req.body;

  if (!model) return res.status(400).json({ error: "Model is required" });

  const normalized = model.trim().toUpperCase();

  const device = apple.find((d) => d.deviceId === id);
  if (!device) return res.status(404).json({ error: "Device not found" });

  const inDB = apple.find(
    (d) => d.model.trim().toUpperCase() === normalized && d.deviceId !== id
  );
  if (inDB) return res.status(409).json({ error: "Device Already Exist" });

  device.model = normalized;

  res.status(200).json({ message: "Device Model Updated", updated: device });
};

export const deleteDevice = (req, res) => {
  const id = Number(req.params.id);
  const index = apple.findIndex((d) => d.deviceId === id);
  if (index === -1) return res.status(404).json({ error: "Device not found" });

  const deleted = apple.splice(index, 1);
  res.json({ message: "Device deleted", deleted: deleted[0] });
};
