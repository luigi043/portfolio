import type { Project } from "./projects";

export const sferaProject: Project = {
  id: "sferatagscanner",
  slug: "sferatagscanner",
  title: "Sfera Tag Scanner",
  shortSummary:
    "A Kotlin Android inventory app with a synthetic-input browser companion powered by shared reference, quantity and duplicate rules.",
  problem:
    "Clothing-tag references must preserve leading zeros, distinguish exact duplicates from color variants and reject invalid stock operations.",
  architecture:
    "The Android source uses Kotlin, Jetpack Compose, Hilt and Room, with CameraX and ML Kit image-input paths and basic Apache POI spreadsheet helpers. The separate browser companion calls a loopback Kotlin HTTP server compiling the actual InventoryRules.kt and SferaCode.kt. Its inventory and movement adapter is server-side and in memory; it does not run Room or reproduce the Android interface.",
  decisions: [
    "Share platform-independent Kotlin reference, quantity and duplicate rules with Android rather than reimplementing them in JavaScript.",
    "Correct status filtering, reject malformed references, invalid quantities, duplicate entries and repeated exits.",
    "Make unfinished Bluetooth/USB/NFC RFID adapters explicitly report unsupported instead of claiming a successful connection.",
    "Keep the companion synthetic and loopback-only, with a bounded 128 MB Java heap and no API credentials.",
  ],
  highlights: [
    "Inspect a dotted reference while retaining leading zeros; distinguish a color variant from an exact duplicate.",
    "Companion inventory supports synthetic entry, full-reference exit, movement history, search and status filtering.",
    "Restore the Gradle wrapper and remove generated Android build products from Git tracking; update the basic spreadsheet dependency without claiming native compatibility verification.",
  ],
  outcome:
    "Preparation passed 18 actual Kotlin core assertions and real Chromium workflow/mobile checks. Integration verifies the running companion without resetting existing inventory. Native Gradle configuration reached SDK discovery and stopped because the Android SDK is missing.",
  constraints: [
    "Native Android build remains blocked by the missing SDK. Camera capture, physical OCR, optional remote image extraction, Room persistence and device file access were not verified.",
    "RFID is unfinished: no tested reader connection, EPC mapping or hardware compatibility is claimed.",
    "Companion inventory/history are server-side in memory, not browser storage. State resets on server restart or explicit sample reset; there is no authentication or persistence.",
    "Exit marks the entire reference out, not a partial sale. Native save/movement transactions and failure recovery still need integration tests.",
    "Spreadsheet helpers read the first worksheet/seven fields and create a new workbook; they do not preserve macros, quantities/status/history or provide full inventory sync/backup.",
    "No affiliation, commissioning, individual contribution narrative, production deployment or business outcome is inferred.",
  ],
  stack: [
    "Kotlin",
    "Jetpack Compose",
    "Room",
    "Hilt",
    "CameraX",
    "ML Kit",
    "Apache POI",
  ],
  categories: ["Mobile"],
  featured: false,
  public: true,
  status: "Android source · Synthetic Kotlin browser companion",
  screenshot: "/assets/projects/sfera-desktop.webp",
  screenshotAlt:
    "Browser companion inspecting a synthetic color variant; not a native Android capture",
  width: 1440,
  height: 1169,
  gallery: [
    {
      src: "/assets/projects/sfera-movements.webp",
      alt: "Kotlin browser companion showing a synthetic quantity-four entry and full-reference exit",
      width: 1440,
      height: 1223,
    },
    {
      src: "/assets/projects/sfera-mobile.webp",
      alt: "Browser companion at 390px with synthetic input and in-memory inventory; not Android UI",
      width: 390,
      height: 1982,
    },
  ],
  visualization: {
    kind: "runtime-screenshot",
    label: "Runtime screenshot",
    description:
      "Real synthetic-input browser companion capture; not Android, OCR or RFID evidence.",
  },
  repositoryUrl: "https://github.com/luigi043/sferatagscanner",
  evidence: [
    "18 Kotlin assertions and browser checks were reported in the prepared checkout on 30 October 2026; these are technical checks, not production or business metrics.",
    "Prepared source improvements have not been pushed; public GitHub may differ from the companion captures.",
  ],
  seo: {
    title: "Sfera Tag Scanner Case Study | Luiz Fehlberg",
    description:
      "Shared Kotlin inventory validation, a synthetic browser companion and the explicit Android SDK, OCR and RFID verification boundaries.",
  },
  caseStudy: true,
};
