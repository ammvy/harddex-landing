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

  // 3. Seed Brands
  console.log("🏷️ Seeding brands...");
  const insertedBrands = await db
    .insert(brands)
    .values([
      { name: "Corsair" },
      { name: "Redragon" },
      { name: "Razer" },
      { name: "Nyx" },
      { name: "Aura" },
      { name: "Forge" },
      { name: "Prism" },
    ])
    .returning();

  // 4. Seed Categories
  console.log("🗂️ Seeding categories...");
  const insertedCategories = await db
    .insert(categories)
    .values([
      { name: "Smartphones", color: "Blue" },
      { name: "Laptops", color: "Red" },
      { name: "Keyboards", color: "Purple" },
      { name: "Mice", color: "Orange" },
    ])
    .returning();

  // 5. Seed Manufacturers
  console.log("🏭 Seeding manufacturers...");
  const insertedManufacturers = await db
    .insert(manufacturers)
    .values([
      { name: "Intel Corporation" },
      { name: "Advanced Micro Devices (AMD)" },
      { name: "NVIDIA" },
      { name: "Samsung Electronics" },
      { name: "Corsair Gaming" },
      { name: "Razer Inc." },
      { name: "Redragon" },
      { name: "Nyx Technologies" },
      { name: "Aura Mobile" },
      { name: "Forge Hardware" },
      { name: "Prism Lab" },
    ])
    .returning();

  // 6. Seed Types
  console.log("🔌 Seeding types...");
  const insertedTypes = await db
    .insert(types)
    .values([
      { name: "Processor", color: "Blue" },
      { name: "Graphics Card", color: "Green" },
      { name: "RAM Memory", color: "Purple" },
      { name: "SSD Storage", color: "Cyan" },
      { name: "Screen", color: "Yellow" },
      { name: "Battery", color: "Red" },
      { name: "Camera", color: "Pink" },
      { name: "Switches", color: "White" },
      { name: "Keycaps", color: "Silver" },
      { name: "Backlight", color: "Gold" },
      { name: "Sensor", color: "Orange" },
      { name: "Cable", color: "Brown" },
    ])
    .returning();

  // 7. Seed Products (8 records)
  console.log("📦 Seeding products...");
  const insertedProducts = await db
    .insert(products)
    .values([
      // Smartphones
      {
        name: "Nyx N9 Pro",
        description: "Smartphone topo de linha com processador Cipher X3 Ultra",
        averagePrice: 6499.0,
        brandId: insertedBrands[3].id,
        categoryId: insertedCategories[0].id,
      },
      {
        name: "Aura Edge 7",
        description: "Smartphone premium com design elegante e tela LTPO AMOLED",
        averagePrice: 5299.0,
        brandId: insertedBrands[4].id,
        categoryId: insertedCategories[0].id,
      },
      // Laptops
      {
        name: "Forge X9",
        description: "Notebook gamer de extrema performance com RTX 5080 Mobile",
        averagePrice: 18999.0,
        brandId: insertedBrands[5].id,
        categoryId: insertedCategories[1].id,
      },
      {
        name: "Prism 15 Studio",
        description: "Notebook workstation com tela OLED e placa gráfica avançada",
        averagePrice: 14299.0,
        brandId: insertedBrands[6].id,
        categoryId: insertedCategories[1].id,
      },
      // Keyboards
      {
        name: "Corsair K70 RGB",
        description: "Mechanical gaming keyboard with cherry MX keys",
        averagePrice: 799.0,
        brandId: insertedBrands[0].id,
        categoryId: insertedCategories[2].id,
      },
      {
        name: "Razer BlackWidow V4",
        description: "Wired mechanical customizable keyboard",
        averagePrice: 1100.0,
        brandId: insertedBrands[2].id,
        categoryId: insertedCategories[2].id,
      },
      // Mice
      {
        name: "Redragon Cobra",
        description: "Ergonomic wired gaming mouse",
        averagePrice: 150.0,
        brandId: insertedBrands[1].id,
        categoryId: insertedCategories[3].id,
      },
      {
        name: "Razer DeathAdder V2",
        description: "Wired gaming mouse with optical sensors",
        averagePrice: 350.0,
        brandId: insertedBrands[2].id,
        categoryId: insertedCategories[3].id,
      },
    ])
    .returning();

  // 8. Seed Reviews (8 records)
  console.log("⭐ Seeding reviews...");
  await db.insert(reviews).values([
    {
      rating: 5.0,
      comment: "Excelente celular, câmera e desempenho inacreditáveis!",
      userId: insertedUsers[0].id,
      productId: insertedProducts[0].id,
    },
    {
      rating: 4.8,
      comment: "Muito bonito e rápido, a bateria dura o dia todo.",
      userId: insertedUsers[1].id,
      productId: insertedProducts[1].id,
    },
    {
      rating: 4.9,
      comment: "Uma máquina de jogos portátil de altíssimo nível.",
      userId: insertedUsers[2].id,
      productId: insertedProducts[2].id,
    },
    {
      rating: 4.7,
      comment: "Perfeito para edição de fotos e vídeos, tela OLED incrível.",
      userId: insertedUsers[3].id,
      productId: insertedProducts[3].id,
    },
    {
      rating: 4.6,
      comment: "Teclado sensacional, muito rápido e excelente construção.",
      userId: insertedUsers[4].id,
      productId: insertedProducts[4].id,
    },
    {
      rating: 4.9,
      comment: "Muito customizável e feedback tátil perfeito.",
      userId: insertedUsers[5].id,
      productId: insertedProducts[5].id,
    },
    {
      rating: 4.2,
      comment: "Ótimo custo-benefício para quem quer um mouse gamer simples.",
      userId: insertedUsers[6].id,
      productId: insertedProducts[6].id,
    },
    {
      rating: 4.8,
      comment: "Sensor incrivelmente preciso e pegada ergonômica.",
      userId: insertedUsers[7].id,
      productId: insertedProducts[7].id,
    },
  ]);

  // 9. Seed Components
  console.log("⚙️ Seeding components...");
  await db
    .insert(components)
    .values([
      // --- Nyx N9 Pro (Smartphone) Components ---
      {
        name: "Cipher X3 Ultra",
        specification: { cores: 8, threads: 8, base_clock: "3.45GHz", process: "3nm" },
        averagePrice: 1200.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[0].id,
        manufacturerId: insertedManufacturers[7].id,
      },
      {
        name: "Cipher GPU U920",
        specification: { tflops: 2.9, clock: "1.2GHz" },
        averagePrice: 800.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[1].id,
        manufacturerId: insertedManufacturers[7].id,
      },
      {
        name: "12GB LPDDR5X",
        specification: { capacity: "12GB", type: "LPDDR5X", speed: "8533MHz" },
        averagePrice: 400.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[2].id,
        manufacturerId: insertedManufacturers[3].id,
      },
      {
        name: "256GB UFS 4.0",
        specification: { capacity: "256GB", type: "UFS 4.0", read_speed: "4100MB/s", write_speed: "3850MB/s" },
        averagePrice: 500.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[3].id,
        manufacturerId: insertedManufacturers[3].id,
      },
      {
        name: "6.7\" LTPO AMOLED",
        specification: { size: "6.7\"", resolution: "1440 × 3200", refresh_rate: "144Hz", panel_type: "LTPO AMOLED", nits: 2400 },
        averagePrice: 1500.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[4].id,
        manufacturerId: insertedManufacturers[3].id,
      },
      {
        name: "Lithium Ion B5200",
        specification: { capacity: "5200mAh", battery_life: "22h", charge_speed: "100W", wireless_charge: "50W" },
        averagePrice: 300.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[5].id,
        manufacturerId: insertedManufacturers[3].id,
      },
      {
        name: "Nyx Triple Camera 50MP",
        specification: { main: "50MP", ultra_wide: "50MP", telephoto: "64MP", max_video: "8K" },
        averagePrice: 1200.0,
        productId: insertedProducts[0].id,
        typeId: insertedTypes[6].id,
        manufacturerId: insertedManufacturers[7].id,
      },

      // --- Aura Edge 7 (Smartphone) Components ---
      {
        name: "Halo H8",
        specification: { cores: 8, threads: 8, base_clock: "3.2GHz", process: "4nm" },
        averagePrice: 900.0,
        productId: insertedProducts[1].id,
        typeId: insertedTypes[0].id,
        manufacturerId: insertedManufacturers[8].id,
      },
      {
        name: "Halo GPU 740",
        specification: { tflops: 2.3, clock: "1.1GHz" },
        averagePrice: 600.0,
        productId: insertedProducts[1].id,
        typeId: insertedTypes[1].id,
        manufacturerId: insertedManufacturers[8].id,
      },
      {
        name: "12GB LPDDR5",
        specification: { capacity: "12GB", type: "LPDDR5", speed: "7500MHz" },
        averagePrice: 300.0,
        productId: insertedProducts[1].id,
        typeId: insertedTypes[2].id,
        manufacturerId: insertedManufacturers[3].id,
      },
      {
        name: "256GB UFS 4.0",
        specification: { capacity: "256GB", type: "UFS 4.0", read_speed: "3700MB/s", write_speed: "3300MB/s" },
        averagePrice: 500.0,
        productId: insertedProducts[1].id,
        typeId: insertedTypes[3].id,
        manufacturerId: insertedManufacturers[3].id,
      },
      {
        name: "6.55\" LTPO AMOLED",
        specification: { size: "6.55\"", resolution: "1440 × 3120", refresh_rate: "120Hz", panel_type: "LTPO AMOLED", nits: 2200 },
        averagePrice: 1200.0,
        productId: insertedProducts[1].id,
        typeId: insertedTypes[4].id,
        manufacturerId: insertedManufacturers[3].id,
      },
      {
        name: "Lithium Ion B4900",
        specification: { capacity: "4900mAh", battery_life: "21h", charge_speed: "80W", wireless_charge: "30W" },
        averagePrice: 250.0,
        productId: insertedProducts[1].id,
        typeId: insertedTypes[5].id,
        manufacturerId: insertedManufacturers[3].id,
      },
      {
        name: "Aura Triple Camera 64MP",
        specification: { main: "64MP", ultra_wide: "48MP", telephoto: "12MP", max_video: "8K" },
        averagePrice: 1000.0,
        productId: insertedProducts[1].id,
        typeId: insertedTypes[6].id,
        manufacturerId: insertedManufacturers[8].id,
      },

      // --- Forge X9 (Laptop) Components ---
      {
        name: "Cipher CX-14 HX",
        specification: { cores: 16, threads: 32, base_clock: "5.4GHz", process: "3nm", tdp: "65W" },
        averagePrice: 3000.0,
        productId: insertedProducts[2].id,
        typeId: insertedTypes[0].id,
        manufacturerId: insertedManufacturers[9].id,
      },
      {
        name: "Cipher RX 5080 Mobile",
        specification: { vram: "16GB", tflops: 32.5 },
        averagePrice: 6000.0,
        productId: insertedProducts[2].id,
        typeId: insertedTypes[1].id,
        manufacturerId: insertedManufacturers[9].id,
      },
      {
        name: "32GB DDR5 RAM",
        specification: { capacity: "32GB", type: "DDR5", speed: "6400MHz" },
        averagePrice: 1200.0,
        productId: insertedProducts[2].id,
        typeId: insertedTypes[2].id,
        manufacturerId: insertedManufacturers[4].id,
      },
      {
        name: "1TB NVMe Gen4",
        specification: { capacity: "1024GB", type: "NVMe Gen4", read_speed: "7200MB/s", write_speed: "6400MB/s" },
        averagePrice: 800.0,
        productId: insertedProducts[2].id,
        typeId: insertedTypes[3].id,
        manufacturerId: insertedManufacturers[4].id,
      },
      {
        name: "16\" Mini-LED 240Hz",
        specification: { size: "16\"", resolution: "2560 × 1600", refresh_rate: "240Hz", panel_type: "Mini-LED", nits: 1000, response_time: "3ms" },
        averagePrice: 2500.0,
        productId: insertedProducts[2].id,
        typeId: insertedTypes[4].id,
        manufacturerId: insertedManufacturers[4].id,
      },
      {
        name: "Forge Polymer 99Wh",
        specification: { capacity: "99Wh", battery_life: "5h", charger: "280W" },
        averagePrice: 500.0,
        productId: insertedProducts[2].id,
        typeId: insertedTypes[5].id,
        manufacturerId: insertedManufacturers[9].id,
      },

      // --- Prism 15 Studio (Laptop) Components ---
      {
        name: "Halo HX-12",
        specification: { cores: 14, threads: 28, base_clock: "5.1GHz", process: "4nm", tdp: "45W" },
        averagePrice: 2200.0,
        productId: insertedProducts[3].id,
        typeId: insertedTypes[0].id,
        manufacturerId: insertedManufacturers[10].id,
      },
      {
        name: "Cipher RX 5070 Mobile",
        specification: { vram: "12GB", tflops: 22.4 },
        averagePrice: 4500.0,
        productId: insertedProducts[3].id,
        typeId: insertedTypes[1].id,
        manufacturerId: insertedManufacturers[10].id,
      },
      {
        name: "32GB DDR5 RAM",
        specification: { capacity: "32GB", type: "DDR5", speed: "5600MHz" },
        averagePrice: 1000.0,
        productId: insertedProducts[3].id,
        typeId: insertedTypes[2].id,
        manufacturerId: insertedManufacturers[4].id,
      },
      {
        name: "1TB NVMe Gen4",
        specification: { capacity: "1024GB", type: "NVMe Gen4", read_speed: "6800MB/s", write_speed: "5400MB/s" },
        averagePrice: 800.0,
        productId: insertedProducts[3].id,
        typeId: insertedTypes[3].id,
        manufacturerId: insertedManufacturers[4].id,
      },
      {
        name: "15.6\" OLED 120Hz",
        specification: { size: "15.6\"", resolution: "2880 × 1800", refresh_rate: "120Hz", panel_type: "OLED", nits: 600, response_time: "1ms" },
        averagePrice: 2000.0,
        productId: insertedProducts[3].id,
        typeId: insertedTypes[4].id,
        manufacturerId: insertedManufacturers[4].id,
      },
      {
        name: "Prism Polymer 86Wh",
        specification: { capacity: "86Wh", battery_life: "9h", charger: "140W" },
        averagePrice: 450.0,
        productId: insertedProducts[3].id,
        typeId: insertedTypes[5].id,
        manufacturerId: insertedManufacturers[10].id,
      },

      // --- Corsair K70 RGB (Keyboard) Components ---
      {
        name: "Cherry MX Red Switches",
        specification: { type: "Mechanical Linear", force: "45g", travel: "2.0mm", lifespan: "100M" },
        averagePrice: 200.0,
        productId: insertedProducts[4].id,
        typeId: insertedTypes[7].id,
        manufacturerId: insertedManufacturers[4].id,
      },
      {
        name: "Corsair PBT Double-Shot Keycaps",
        specification: { material: "PBT", printing: "Double-shot", layout: "ABNT2" },
        averagePrice: 150.0,
        productId: insertedProducts[4].id,
        typeId: insertedTypes[8].id,
        manufacturerId: insertedManufacturers[4].id,
      },
      {
        name: "Corsair Per-Key Backlight",
        specification: { leds: "RGB", zones: "Per-key", software: "iCUE" },
        averagePrice: 100.0,
        productId: insertedProducts[4].id,
        typeId: insertedTypes[9].id,
        manufacturerId: insertedManufacturers[4].id,
      },

      // --- Razer BlackWidow V4 (Keyboard) Components ---
      {
        name: "Razer Green Switches",
        specification: { type: "Mechanical Clicky", force: "50g", travel: "1.9mm", lifespan: "80M" },
        averagePrice: 250.0,
        productId: insertedProducts[5].id,
        typeId: insertedTypes[7].id,
        manufacturerId: insertedManufacturers[5].id,
      },
      {
        name: "Razer ABS Keycaps",
        specification: { material: "ABS", printing: "Laser etched", layout: "US Layout" },
        averagePrice: 120.0,
        productId: insertedProducts[5].id,
        typeId: insertedTypes[8].id,
        manufacturerId: insertedManufacturers[5].id,
      },
      {
        name: "Razer Chroma RGB",
        specification: { leds: "RGB", zones: "Per-key + Underglow", software: "Synapse" },
        averagePrice: 150.0,
        productId: insertedProducts[5].id,
        typeId: insertedTypes[9].id,
        manufacturerId: insertedManufacturers[5].id,
      },

      // --- Redragon Cobra (Mouse) Components ---
      {
        name: "Pixart PMW3325",
        specification: { type: "Optical", max_dpi: 10000, ips: 100, acceleration: "20G" },
        averagePrice: 50.0,
        productId: insertedProducts[6].id,
        typeId: insertedTypes[10].id,
        manufacturerId: insertedManufacturers[6].id,
      },
      {
        name: "Huano Blue Switches",
        specification: { type: "Mechanical", durability: "20M clicks" },
        averagePrice: 30.0,
        productId: insertedProducts[6].id,
        typeId: insertedTypes[7].id,
        manufacturerId: insertedManufacturers[6].id,
      },
      {
        name: "Redragon Braided Cable",
        specification: { length: "1.8m", type: "Braided USB" },
        averagePrice: 20.0,
        productId: insertedProducts[6].id,
        typeId: insertedTypes[11].id,
        manufacturerId: insertedManufacturers[6].id,
      },

      // --- Razer DeathAdder V2 (Mouse) Components ---
      {
        name: "Focus+ Optical Sensor",
        specification: { type: "Optical", max_dpi: 20000, ips: 650, acceleration: "50G" },
        averagePrice: 120.0,
        productId: insertedProducts[7].id,
        typeId: insertedTypes[10].id,
        manufacturerId: insertedManufacturers[5].id,
      },
      {
        name: "Razer Optical Mouse Switches",
        specification: { type: "Optical", durability: "70M clicks" },
        averagePrice: 80.0,
        productId: insertedProducts[7].id,
        typeId: insertedTypes[7].id,
        manufacturerId: insertedManufacturers[5].id,
      },
      {
        name: "Speedflex Cable",
        specification: { length: "2.1m", type: "Razer Speedflex" },
        averagePrice: 40.0,
        productId: insertedProducts[7].id,
        typeId: insertedTypes[11].id,
        manufacturerId: insertedManufacturers[5].id,
      },
    ])
    .returning();

  // 10. Seed Attachments
  console.log("📎 Seeding attachments...");
  await db.insert(attachments).values([
    {
      name: "Logo Corsair",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      brandId: insertedBrands[0].id,
    },
    {
      name: "Foto K70 Keyboard",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      productId: insertedProducts[4].id,
    },
    {
      name: "Manual do Teclado K70",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      productId: insertedProducts[4].id,
    },
    {
      name: "Logo Razer",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      brandId: insertedBrands[2].id,
    },
    {
      name: "Foto DeathAdder V2",
      url: "https://i.pinimg.com/1200x/78/d9/6a/78d96aee53fbd6b6afba38a029070e25.jpg",
      productId: insertedProducts[7].id,
    },
  ]);

  console.log("✅ Seed completed successfully!");
}

seed().catch((err) => {
  console.error("❌ Error seeding database:", err);
  process.exit(1);
});
