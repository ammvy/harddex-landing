import { Component } from "../_types";

export const SEED_COMPONENTS: Component[] = [
  {
    id: 1,
    name: "Chip Gráfico AD104-350-A1",
    specification: { "CUDA Cores": "7168", "Base Clock": "1980 MHz", "Boost Clock": "2475 MHz" },
    description: "GPU core central fabricado pela TSMC para a RTX 4070 Super.",
    averagePrice: 2500,
    productId: 1,
    typeId: 1,
    manufacturerId: 1,
  },
  {
    id: 2,
    name: "Núcleo Zen 4 CCD",
    specification: { Cores: "8", Threads: "16", L3Cache: "96MB" },
    description: "Matriz de processador de 8 núcleos com empilhamento 3D V-Cache.",
    averagePrice: 1800,
    productId: 2,
    typeId: 2,
    manufacturerId: 1,
  },
  {
    id: 3,
    name: "Chassis de Fibra de Carbono",
    specification: { Material: "Fibra de Carbono", Peso: "1.09 kg" },
    description: "Estrutura robusta e leve exclusiva da linha ThinkPad X1.",
    averagePrice: 1200,
    productId: 3,
    typeId: 3,
    manufacturerId: 4,
  },
];
