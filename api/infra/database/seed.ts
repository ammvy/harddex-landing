import "dotenv/config";
import { createDatabase } from "./connection";
import {
  users,
  brands,
  categories,
  manufacturers,
  types,
  products,
  reviews,
  components,
  attachments,
} from "./models/index";

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not defined.");
  }

  console.log("🌱 Starting seed...");
  const db = createDatabase(databaseUrl);

  // 1. Clean existing data in reverse order of relationships
  console.log("🧹 Cleaning existing tables...");
  await db.delete(attachments);
  await db.delete(components);
  await db.delete(reviews);
  await db.delete(products);
  await db.delete(types);
  await db.delete(manufacturers);
  await db.delete(categories);
  await db.delete(brands);
  await db.delete(users);

  // 2. Seed Users (15 records)
  console.log("👥 Seeding users...");
  const insertedUsers = await db
    .insert(users)
    .values([
      {
        name: "Mirela Andressa de Oliveira",
        email: "mirela@harddex.com",
        password: "password123",
        style: "PROFESSIONAL",
        permission: "ADMIN",
      },
      {
        name: "Victor Lis Bronzo",
        email: "victor@harddex.com",
        password: "password123",
        style: "GAMER",
        permission: "CURATOR",
      },
      {
        name: "Ana Tayna Reis Maciel",
        email: "ana@email.com",
        password: "password123",
        style: "INTERMEDIATE",
        permission: "USER",
      },
      {
        name: "Mariana Mourão Sampaio",
        email: "mariana@email.com",
        password: "password123",
        style: "BASIC",
        permission: "USER",
      },
      {
        name: "Yago Barbosa Dini",
        email: "yago@email.com",
        password: "password123",
        style: "ADVANCED",
        permission: "USER",
      },
      {
        name: "Gabriel Santos",
        email: "gabriel@email.com",
        password: "password123",
        style: "GAMER",
        permission: "USER",
      },
      {
        name: "Lucas Silva",
        email: "lucas@email.com",
        password: "password123",
        style: "BASIC",
        permission: "USER",
      },
      {
        name: "Juliana Costa",
        email: "juliana@email.com",
        password: "password123",
        style: "PROFESSIONAL",
        permission: "USER",
      },
      {
        name: "Matheus Pereira",
        email: "matheus@email.com",
        password: "password123",
        style: "ADVANCED",
        permission: "USER",
      },
      {
        name: "Larissa Rodrigues",
        email: "larissa@email.com",
        password: "password123",
        style: "INTERMEDIATE",
        permission: "USER",
      },
      {
        name: "Rodrigo Souza",
        email: "rodrigo@email.com",
        password: "password123",
        style: "GAMER",
        permission: "USER",
      },
      {
        name: "Beatriz Almeida",
        email: "beatriz@email.com",
        password: "password123",
        style: "BASIC",
        permission: "USER",
      },
      {
        name: "Felipe Gomes",
        email: "felipe@email.com",
        password: "password123",
        style: "PROFESSIONAL",
        permission: "CURATOR",
      },
      {
        name: "Camila Fernandes",
        email: "camila@email.com",
        password: "password123",
        style: "ADVANCED",
        permission: "USER",
      },
      {
        name: "Thiago Martins",
        email: "thiago@email.com",
        password: "password123",
        style: "INTERMEDIATE",
        permission: "USER",
      },
    ])
    .returning();

  // 3. Seed Brands (15 records)
  console.log("🏷️ Seeding brands...");
  const insertedBrands = await db
    .insert(brands)
    .values([
      { name: "ASUS" },
      { name: "Gigabyte" },
      { name: "Corsair" },
      { name: "Redragon" },
      { name: "MSI" },
      { name: "Logitech" },
      { name: "Razer" },
      { name: "HyperX" },
      { name: "Crucial" },
      { name: "EVGA" },
      { name: "Intel" },
      { name: "AMD" },
      { name: "NVIDIA" },
      { name: "Kingston" },
      { name: "Western Digital" },
    ])
    .returning();

  // 4. Seed Categories (15 records)
  console.log("🗂️ Seeding categories...");
  const insertedCategories = await db
    .insert(categories)
    .values([
      { name: "Hardware", color: "Blue" },
      { name: "Peripherals", color: "Red" },
      { name: "Prebuilt Computers", color: "Black" },
      { name: "Monitors", color: "Yellow" },
      { name: "Keyboards", color: "Purple" },
      { name: "Mice", color: "Orange" },
      { name: "Headsets", color: "Green" },
      { name: "Storage Devices", color: "Grey" },
      { name: "Cables & Adapters", color: "White" },
      { name: "Cooling Systems", color: "Cyan" },
      { name: "Power Supplies", color: "Gold" },
      { name: "PC Cases", color: "Silver" },
      { name: "Accessories", color: "Pink" },
      { name: "Software", color: "Violet" },
      { name: "Network Devices", color: "Brown" },
    ])
    .returning();

  // 5. Seed Manufacturers (15 records)
  console.log("🏭 Seeding manufacturers...");
  const insertedManufacturers = await db
    .insert(manufacturers)
    .values([
      { name: "Intel Corporation" },
      { name: "Advanced Micro Devices (AMD)" },
      { name: "NVIDIA" },
      { name: "Kingston Technology" },
      { name: "Samsung Electronics" },
      { name: "TSMC" },
      { name: "Sony" },
      { name: "ASUSTeK Computer" },
      { name: "MSI Co." },
      { name: "Gigabyte Technology" },
      { name: "Seagate Technology" },
      { name: "Toshiba" },
      { name: "Corsair Gaming" },
      { name: "Western Digital Corporation" },
      { name: "Logitech International" },
    ])
    .returning();

  // 6. Seed Types (15 records)
  console.log("🔌 Seeding types...");
  const insertedTypes = await db
    .insert(types)
    .values([
      { name: "Processor", color: "Blue" },
      { name: "Graphics Card", color: "Green" },
      { name: "Motherboard", color: "Yellow" },
      { name: "RAM Memory", color: "Purple" },
      { name: "SSD Storage", color: "Cyan" },
      { name: "HDD Storage", color: "Orange" },
      { name: "Power Supply Unit", color: "Red" },
      { name: "CPU Cooler", color: "White" },
      { name: "Case Fan", color: "Pink" },
      { name: "Sound Card", color: "Silver" },
      { name: "Network Card", color: "Gold" },
      { name: "Thermal Paste", color: "Grey" },
      { name: "SATA Cable", color: "Brown" },
      { name: "PCIe Riser", color: "Violet" },
      { name: "VRM Heatsink", color: "Black" },
    ])
    .returning();

  // 7. Seed Products (15 records)
  console.log("📦 Seeding products...");
  const insertedProducts = await db
    .insert(products)
    .values([
      {
        name: "PC Gamer Ninja",
        description: "Computador montado focado em e-sports",
        averagePrice: 4500.0,
        brandId: insertedBrands[0].id,
        categoryId: insertedCategories[2].id,
      },
      {
        name: "Kit Upgrade AMD",
        description: "Kit com processador e placa-mãe para jogos",
        averagePrice: 2100.0,
        brandId: insertedBrands[1].id,
        categoryId: insertedCategories[0].id,
      },
      {
        name: "Corsair K70 RGB",
        description: "Mechanical gaming keyboard with cherry MX keys",
        averagePrice: 799.0,
        brandId: insertedBrands[2].id,
        categoryId: insertedCategories[4].id,
      },
      {
        name: "Redragon Cobra",
        description: "Ergonomic wired gaming mouse",
        averagePrice: 150.0,
        brandId: insertedBrands[3].id,
        categoryId: insertedCategories[5].id,
      },
      {
        name: "MSI Optix G241",
        description: "24-inch IPS 144Hz gaming monitor",
        averagePrice: 1200.0,
        brandId: insertedBrands[4].id,
        categoryId: insertedCategories[3].id,
      },
      {
        name: "Razer DeathAdder V2",
        description: "Wired gaming mouse with optical sensors",
        averagePrice: 350.0,
        brandId: insertedBrands[6].id,
        categoryId: insertedCategories[5].id,
      },
      {
        name: "Logitech G PRO X",
        description: "Wireless gaming headset with Blue VO!CE",
        averagePrice: 999.0,
        brandId: insertedBrands[5].id,
        categoryId: insertedCategories[6].id,
      },
      {
        name: "HyperX QuadCast",
        description: "USB standalone condenser microphone",
        averagePrice: 850.0,
        brandId: insertedBrands[7].id,
        categoryId: insertedCategories[1].id,
      },
      {
        name: "Crucial P3 Plus 1TB",
        description: "PCIe Gen4 NVMe M.2 SSD storage",
        averagePrice: 450.0,
        brandId: insertedBrands[8].id,
        categoryId: insertedCategories[7].id,
      },
      {
        name: "EVGA SuperNOVA 750W",
        description: "80 Plus Gold certified modular power supply",
        averagePrice: 650.0,
        brandId: insertedBrands[9].id,
        categoryId: insertedCategories[10].id,
      },
      {
        name: "Kingston Fury Beast 16GB",
        description: "DDR4 RGB high performance RAM module",
        averagePrice: 380.0,
        brandId: insertedBrands[13].id,
        categoryId: insertedCategories[0].id,
      },
      {
        name: "WD Blue 2TB HDD",
        description: "Internal 3.5-inch SATA hard drive",
        averagePrice: 320.0,
        brandId: insertedBrands[14].id,
        categoryId: insertedCategories[7].id,
      },
      {
        name: "ASUS ROG Strix Helios",
        description: "Premium mid-tower gaming case with RGB",
        averagePrice: 1800.0,
        brandId: insertedBrands[0].id,
        categoryId: insertedCategories[11].id,
      },
      {
        name: "Gigabyte G5 Gaming Laptop",
        description: "Laptop with RTX 4060 and Core i7 CPU",
        averagePrice: 5800.0,
        brandId: insertedBrands[1].id,
        categoryId: insertedCategories[2].id,
      },
      {
        name: "Razer BlackWidow V4",
        description: "Wired mechanical customizable keyboard",
        averagePrice: 1100.0,
        brandId: insertedBrands[6].id,
        categoryId: insertedCategories[4].id,
      },
    ])
    .returning();

  // 8. Seed Reviews (15 records)
  console.log("⭐ Seeding reviews...");
  await db.insert(reviews).values([
    {
      rating: 5.0,
      comment: "Excelente custo-benefício, rodou tudo no ultra!",
      userId: insertedUsers[2].id,
      productId: insertedProducts[0].id,
    },
    {
      rating: 4.5,
      comment: "Muito bom, mas a entrega demorou um pouco.",
      userId: insertedUsers[3].id,
      productId: insertedProducts[1].id,
    },
    {
      rating: 4.8,
      comment: "Amazing keyboard, very clicky!",
      userId: insertedUsers[4].id,
      productId: insertedProducts[2].id,
    },
    {
      rating: 4.0,
      comment: "Good budget mouse.",
      userId: insertedUsers[5].id,
      productId: insertedProducts[3].id,
    },
    {
      rating: 4.7,
      comment: "Stunning colors and contrast on this monitor.",
      userId: insertedUsers[6].id,
      productId: insertedProducts[4].id,
    },
    {
      rating: 5.0,
      comment: "The best shape for palm grip players.",
      userId: insertedUsers[7].id,
      productId: insertedProducts[5].id,
    },
    {
      rating: 4.6,
      comment: "Mic quality is studio grade.",
      userId: insertedUsers[8].id,
      productId: insertedProducts[6].id,
    },
    {
      rating: 4.9,
      comment: "Highly recommended for streaming.",
      userId: insertedUsers[9].id,
      productId: insertedProducts[7].id,
    },
    {
      rating: 4.3,
      comment: "Blazing fast load times in games.",
      userId: insertedUsers[10].id,
      productId: insertedProducts[8].id,
    },
    {
      rating: 4.7,
      comment: "Silent fan, stable voltages.",
      userId: insertedUsers[11].id,
      productId: insertedProducts[9].id,
    },
    {
      rating: 5.0,
      comment: "Looks great with custom RGB syncing.",
      userId: insertedUsers[12].id,
      productId: insertedProducts[10].id,
    },
    {
      rating: 3.8,
      comment: "Standard storage, a bit slow but plenty of space.",
      userId: insertedUsers[13].id,
      productId: insertedProducts[11].id,
    },
    {
      rating: 4.8,
      comment: "Huge case, excellent airflow.",
      userId: insertedUsers[14].id,
      productId: insertedProducts[12].id,
    },
    {
      rating: 4.2,
      comment: "Runs hot but performs amazingly.",
      userId: insertedUsers[0].id,
      productId: insertedProducts[13].id,
    },
    {
      rating: 4.9,
      comment: "A bit expensive but worth every penny.",
      userId: insertedUsers[1].id,
      productId: insertedProducts[14].id,
    },
  ]);

  // 9. Seed Components (15 records)
  console.log("⚙️ Seeding components...");
  const insertedComponents = await db
    .insert(components)
    .values([
      {
        name: "Ryzen 5 5600X",
        specification: { cores: 6, threads: 12, base_clock: "3.7GHz" },
        averagePrice: 950.0,
        productId: insertedProducts[1].id,
        typeId: insertedTypes[0].id,
        manufacturerId: insertedManufacturers[1].id,
      },
      {
        name: "Placa-Mãe B550M",
        specification: { form_factor: "Micro ATX", pcie_version: "4.0", socket: "AM4" },
        averagePrice: 850.0,
        productId: insertedProducts[1].id,
        typeId: insertedTypes[2].id,
        manufacturerId: insertedManufacturers[1].id,
      },
      {
        name: "RTX 3060 12GB",
        specification: { memory: "12GB GDDR6", ray_tracing: true, dlss: true },
        averagePrice: 1800.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[1].id,
        manufacturerId: insertedManufacturers[2].id,
      },
      {
        name: "Core i7-12700F",
        specification: { cores: 12, threads: 20, boost_clock: "4.9GHz" },
        averagePrice: 1900.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[0].id,
        manufacturerId: insertedManufacturers[0].id,
      },
      {
        name: "Kingston Fury 8GB DDR4",
        specification: { capacity: "8GB", type: "DDR4", speed: "3200MHz", latency: "CL16", form_factor: "DIMM" },
        averagePrice: 190.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[3].id,
        manufacturerId: insertedManufacturers[3].id,
      },
      {
        name: "Samsung 980 Pro 1TB",
        specification: { capacity: "1TB", form_factor: "M.2", interface: "PCIe 4.0 NVMe" },
        averagePrice: 650.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[4].id,
        manufacturerId: insertedManufacturers[4].id,
      },
      {
        name: "Corsair RM850x PSU",
        specification: { wattage: "850W", modularity: "Full", type: "Power Supply Unit" },
        averagePrice: 890.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[6].id,
        manufacturerId: insertedManufacturers[12].id,
      },
      {
        name: "Intel Stock Cooler",
        specification: { type: "Heatsink Fan", compatibility: "Intel" },
        averagePrice: 40.0,
        productId: insertedProducts[13].id,
        typeId: insertedTypes[7].id,
        manufacturerId: insertedManufacturers[0].id,
      },
      {
        name: "Seagate BarraCuda 2TB",
        specification: { capacity: "2TB", rpm: 7200, form_factor: "3.5 inch", interface: "SATA" },
        averagePrice: 350.0,
        productId: insertedProducts[13].id,
        typeId: insertedTypes[5].id,
        manufacturerId: insertedManufacturers[10].id,
      },
      {
        name: "ASUS ROG B660-F",
        specification: { form_factor: "ATX", compatibility: "Intel 12th gen" },
        averagePrice: 1300.0,
        productId: insertedProducts[13].id,
        typeId: insertedTypes[2].id,
        manufacturerId: insertedManufacturers[7].id,
      },
      {
        name: "Crucial MX500 500GB",
        specification: { capacity: "500GB", form_factor: "2.5 inch", interface: "SATA" },
        averagePrice: 280.0,
        productId: insertedProducts[13].id,
        typeId: insertedTypes[4].id,
        manufacturerId: insertedManufacturers[13].id,
      },
      {
        name: "Razer Optical Click Switches",
        specification: { type: "Replacement switches", application: "Gaming mouse" },
        averagePrice: 80.0,
        productId: insertedProducts[5].id,
        typeId: insertedTypes[9].id,
        manufacturerId: insertedManufacturers[14].id,
      },
      {
        name: "Redragon RGB Fan Set",
        specification: { quantity: 3, size: "120mm", features: "Customizable RGB" },
        averagePrice: 120.0,
        productId: insertedProducts[3].id,
        typeId: insertedTypes[8].id,
        manufacturerId: insertedManufacturers[9].id,
      },
      {
        name: "HyperX Cloud Replacement Cord",
        specification: { connector: "3.5mm jack", material: "Braided" },
        averagePrice: 45.0,
        productId: insertedProducts[7].id,
        typeId: insertedTypes[12].id,
        manufacturerId: insertedManufacturers[6].id,
      },
      {
        name: "Thermal Grizzly Paste",
        specification: { model: "Kryonaut", efficiency: "High" },
        averagePrice: 75.0,
        productId: insertedProducts[1].id,
        typeId: insertedTypes[11].id,
        manufacturerId: insertedManufacturers[1].id,
      },
    ])
    .returning();

  // 10. Seed Attachments (15 records)
  console.log("📎 Seeding attachments...");
  await db.insert(attachments).values([
    {
      name: "Logo ASUS",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      brandId: insertedBrands[0].id,
    },
    {
      name: "Foto PC Gamer Ninja",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      productId: insertedProducts[0].id,
    },
    {
      name: "Foto Ryzen 5 5600X",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      componentId: insertedComponents[0].id,
    },
    {
      name: "Logo AMD",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      manufacturerId: insertedManufacturers[1].id,
    },
    {
      name: "Manual do Teclado K70",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      productId: insertedProducts[2].id,
    },
    {
      name: "Ficha Técnica G PRO X",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      productId: insertedProducts[6].id,
    },
    {
      name: "Drivers Placa de Vídeo",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      componentId: insertedComponents[2].id,
    },
    {
      name: "Certificação Gold PSU",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      productId: insertedProducts[9].id,
    },
    {
      name: "Logo Logitech",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      brandId: insertedBrands[5].id,
    },
    {
      name: "Logo Razer",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      brandId: insertedBrands[6].id,
    },
    {
      name: "Banner Harddex Promo",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      productId: insertedProducts[0].id,
    },
    {
      name: "Guia do Upgrade AMD",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      productId: insertedProducts[1].id,
    },
    {
      name: "Guia Rápido de Instalação B550M",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      componentId: insertedComponents[1].id,
    },
    {
      name: "Logo MSI",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      brandId: insertedBrands[4].id,
    },
    {
      name: "Logo Samsung",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      manufacturerId: insertedManufacturers[4].id,
    },
  ]);

  console.log("✅ Seed completed successfully!");
}

seed().catch((err) => {
  console.error("❌ Error seeding database:", err);
  process.exit(1);
});
