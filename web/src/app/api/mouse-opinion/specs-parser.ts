import { Device } from "../../compare/_data/types";

export function getFlatSpecs(device: Device): any {
  if (!device.specs) {
    return {
      ports: [],
      display: {},
      battery: {},
      camera: {},
      webcam: {},
      bench: {},
    };
  }

  if (!Array.isArray(device.specs)) {
    // If it's already a flat object (static data), return it but ensure nested objects are safe
    const s = device.specs as any;
    return {
      cpu: s.cpu || "",
      cpuCores: s.cpuCores || 0,
      cpuClock: s.cpuClock || 0,
      process: s.process || "",
      tdp: s.tdp || 0,
      gpu: s.gpu || "",
      vram: s.vram || 0,
      gpuTflops: s.gpuTflops || 0,
      ram: s.ram || 0,
      ramType: s.ramType || "",
      ramSpeed: s.ramSpeed || 0,
      storage: s.storage || 0,
      storageType: s.storageType || "",
      read: s.read || 0,
      write: s.write || 0,
      display: {
        size: s.display?.size || 0,
        res: s.display?.res || "",
        refresh: s.display?.refresh || 0,
        panel: s.display?.panel || "",
        nits: s.display?.nits || 0,
        gamut: s.display?.gamut || 0,
        response: s.display?.response || 0,
      },
      battery: {
        capacity: s.battery?.capacity || 0,
        life: s.battery?.life || 0,
        charge: s.battery?.charge || 0,
        wireless: s.battery?.wireless || 0,
      },
      camera: {
        main: s.camera?.main || 0,
        ultra: s.camera?.ultra || 0,
        tele: s.camera?.tele || 0,
        videoK: s.camera?.videoK || 0,
      },
      webcam: {
        mp: s.webcam?.mp || 0,
        ir: !!s.webcam?.ir,
      },
      weight: s.weight || 0,
      dims: s.dims || "",
      wifi: s.wifi || "",
      bt: s.bt || "",
      ports: Array.isArray(s.ports) ? s.ports : [],
      os: s.os || "",
      bench: {
        antutu: s.bench?.antutu || 0,
        gbSingle: s.bench?.gbSingle || 0,
        gbMulti: s.bench?.gbMulti || 0,
        threeDmark: s.bench?.threeDmark || 0,
      },
    };
  }

  // If it's an array of components (from the database)
  const componentsList = device.specs || [];
  
  const findComp = (typeName: string) => {
    return componentsList.find((c: any) => c.type?.name?.toLowerCase() === typeName.toLowerCase());
  };

  const cpuComp = findComp("Processor") || findComp("cpu") || findComp("processador");
  const gpuComp = findComp("Graphics Card") || findComp("gpu") || findComp("GPU") || findComp("placa de vídeo") || findComp("placa-mãe");
  const ramComp = findComp("RAM Memory") || findComp("ram") || findComp("RAM") || findComp("memória ram");
  const ssdComp = findComp("SSD Storage") || findComp("storage") || findComp("SSD") || findComp("armazenamento");
  const displayComp = findComp("Screen") || findComp("display") || findComp("Tela") || findComp("painel");
  const batteryComp = findComp("Battery") || findComp("battery") || findComp("Bateria");
  const cameraComp = findComp("Camera") || findComp("camera") || findComp("Câmera");
  const webcamComp = findComp("Webcam") || findComp("webcam");
  const connectivityComp = findComp("Connectivity & Physical") || findComp("connectivity") || findComp("Conectividade & Físico") || findComp("conexões");

  const parseNumber = (val: any): number => {
    if (val === undefined || val === null) return 0;
    if (typeof val === "number") return val;
    const match = String(val).match(/^([\d.,]+)/);
    if (match) {
      const num = parseFloat(match[1].replace(",", "."));
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  const parseString = (val: any): string => {
    if (val === undefined || val === null) return "";
    return String(val);
  };

  // Build the flat specs object
  const specs: any = {
    cpu: cpuComp?.name || "Processador Genérico",
    cpuCores: parseNumber(cpuComp?.specification?.cores),
    cpuClock: parseNumber(cpuComp?.specification?.base_clock || cpuComp?.specification?.boost_clock || cpuComp?.specification?.clock),
    process: parseString(cpuComp?.specification?.process || "4nm"),
    tdp: parseNumber(cpuComp?.specification?.tdp),

    gpu: gpuComp?.name || "GPU Integrada",
    vram: parseNumber(gpuComp?.specification?.vram),
    gpuTflops: parseNumber(gpuComp?.specification?.tflops),

    ram: parseNumber(ramComp?.specification?.capacity),
    ramType: parseString(ramComp?.specification?.type || "DDR5"),
    ramSpeed: parseNumber(ramComp?.specification?.speed),

    storage: parseNumber(ssdComp?.specification?.capacity),
    storageType: parseString(ssdComp?.specification?.type || "SSD NVMe"),
    read: parseNumber(ssdComp?.specification?.read_speed || ssdComp?.specification?.read),
    write: parseNumber(ssdComp?.specification?.write_speed || ssdComp?.specification?.write),

    display: {
      size: parseNumber(displayComp?.specification?.size),
      res: parseString(displayComp?.specification?.resolution || displayComp?.specification?.res || "1920 × 1080"),
      refresh: parseNumber(displayComp?.specification?.refresh_rate || displayComp?.specification?.refresh),
      panel: parseString(displayComp?.specification?.panel_type || displayComp?.specification?.panel || "IPS"),
      nits: parseNumber(displayComp?.specification?.nits),
      gamut: parseNumber(displayComp?.specification?.gamut || 100),
      response: parseNumber(displayComp?.specification?.response_time || displayComp?.specification?.response),
    },

    battery: {
      capacity: parseNumber(batteryComp?.specification?.capacity),
      life: parseNumber(batteryComp?.specification?.battery_life || batteryComp?.specification?.life),
      charge: parseNumber(batteryComp?.specification?.charge_speed || batteryComp?.specification?.charger || batteryComp?.specification?.charge),
      wireless: parseNumber(batteryComp?.specification?.wireless_charge || batteryComp?.specification?.wireless),
    },

    camera: {
      main: parseNumber(cameraComp?.specification?.main),
      ultra: parseNumber(cameraComp?.specification?.ultra_wide || cameraComp?.specification?.ultra),
      tele: parseNumber(cameraComp?.specification?.telephoto || cameraComp?.specification?.tele),
      videoK: parseNumber(cameraComp?.specification?.max_video || cameraComp?.specification?.videoK),
    },

    webcam: {
      mp: parseNumber(webcamComp?.specification?.resolution || webcamComp?.specification?.mp || 2),
      ir: !!(webcamComp?.specification?.features?.includes("IR") || webcamComp?.specification?.ir),
    },

    weight: parseNumber(connectivityComp?.specification?.weight || (device.category === "phone" ? 190 : 1.8)),
    dims: parseString(connectivityComp?.specification?.dimensions || connectivityComp?.specification?.dims || "300 x 200 x 15 mm"),
    wifi: parseString(connectivityComp?.specification?.wifi || "Wi-Fi 6"),
    bt: parseString(connectivityComp?.specification?.bluetooth || connectivityComp?.specification?.bt || "5.3"),
    ports: Array.isArray(connectivityComp?.specification?.ports) 
      ? connectivityComp.specification.ports 
      : (typeof connectivityComp?.specification?.ports === "string" 
          ? connectivityComp.specification.ports.split(",").map((s: string) => s.trim()) 
          : []),
    os: parseString(connectivityComp?.specification?.os || (device.category === "phone" ? "Android 15" : "Windows 11")),
    bench: {
      antutu: parseNumber(cpuComp?.specification?.antutu || 1000000),
      gbSingle: parseNumber(cpuComp?.specification?.gbSingle || 2000),
      gbMulti: parseNumber(cpuComp?.specification?.gbMulti || 8000),
      threeDmark: parseNumber(gpuComp?.specification?.threeDmark || 10000),
    }
  };

  return specs;
}
