import { brands } from "../data/brands.js";

export const getAllUsers = (req, res) => {
  const { name, id } = req.query; // ?name=APP or ?id=AE
  let result = brands;

  if (id) {
    const norm = String(id).trim().toUpperCase();
    result = result.filter(b => b.brandId === norm);
  }
  if (name) {
    const norm = String(name).trim().toUpperCase();
    result = result.filter(b => b.brandName.includes(norm));
  }

  res.status(200).json(result);
};

export const createUser = (req, res) => {
  let { brandName } = req.body;
  if (!brandName)
    return res.status(400).json({ error: "Brand name is required" });

  const inDB = brands.find((b) => b.brandName === brandName.toUpperCase());
  if (inDB) return res.status(409).json({ error: "Brand Already Exist" });

  const brandId =
    brandName[0].toUpperCase() + brandName[brandName.length - 1].toUpperCase();
  brandName = brandName.toUpperCase();

  let newBrand = {
    brandId,
    brandName,
  };

  brands.push(newBrand);
  res.status(201).json(`Brand ${brandName.toUpperCase()} Created`);
};

export const getUserById = (req, res) => {
  const id = req.params.id;
  const foundBrand = brands.find((b) => b.brandId === id.toUpperCase());

  if (!foundBrand) return res.status(404).json({ error: "Brand Not Found" });
  res.status(200).json(foundBrand);
};

export const updateUser = (req, res) => {
  const id = req.params.id;
  let { brandName } = req.body;

  const foundBrand = brands.find((b) => b.brandId === id.toUpperCase());
  if (!foundBrand) return res.status(404).json({ error: "Brand Not Found" });

  const brandId =
    brandName[0].toUpperCase() + brandName[brandName.length - 1].toUpperCase();
  if (brandName) {
    foundBrand.brandId = brandId;
    foundBrand.brandName = brandName.toUpperCase();
  }
  res.status(200).json({ "Brand Updated": foundBrand });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = brands.findIndex((b) => b.brandId === id.toUpperCase());
  if (index === -1) return res.status(404).json({ error: "Brand not found" });

  const deleted = brands.splice(index, 1);
  res.json({ message: "Brand deleted", deleted: deleted[0] });
};
