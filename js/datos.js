/* ============================================================
   DATOS DE LA WEB — GENERADO AUTOMÁTICAMENTE. NO EDITAR A MANO.

   Este archivo lo escribe el panel a partir de contenido.json.
   Si lo editas aquí, el próximo cambio desde el panel lo sobrescribe.

   Para cambiar algo:  ./herramientas/cms.sh
   ============================================================ */

/* GUMROAD se usa en los botones de COMPRA: su overlay (el pago encima de la
   web, sin salir) solo reconoce URLs de *.gumroad.com. TIENDA se usa donde el
   visitante sí se va. */
var GUMROAD = "https://ianerastudio.gumroad.com";
var TIENDA  = "https://tienda.ianerastudio.com";
var CANAL   = "https://www.youtube.com/@IanEraStudio";

/* Un null no pinta el icono. */
var REDES = {"youtube":"https://www.youtube.com/@IanEraStudio","instagram":"https://instagram.com/ianerastudio","soundcloud":null,"spotify":null,"tiktok":"https://www.tiktok.com/@ian_era_studio"};

/* Un null manda al catálogo entero en vez de a una ficha que no existe. */
var PRODUCTOS = {"riseagain":"https://ianerastudio.gumroad.com/l/raiseagain","takemethere":"https://ianerastudio.gumroad.com/l/take-me-there-project","blessings":"https://ianerastudio.gumroad.com/l/calvin-harris-blessings","harmony":"https://ianerastudio.gumroad.com/l/harmony","caramelle":"https://ianerastudio.gumroad.com/l/caramelle","bundle":null,"gratis":"https://ianerastudio.gumroad.com/l/welcome-sample-pack"};

var PRECIO = "8,99 €";
var BUNDLE = {"precio":"24 €","antes":"35,96 €"};

/* portada: la imagen de la TARJETA. Es la miniatura del vídeo, que está
   pensada para leerse pequeña y distingue un proyecto de otro de un vistazo.
   captura: la imagen del PANEL y de la carátula del vídeo, donde hay sitio
   para leerla. bpm/tono/pistas a null no se pintan. */
var PROYECTOS = [
  {
    "id": "riseagain",
    "t": "Rise Again",
    "a": "DubVision",
    "y": "2026",
    "video": null,
    "captura": "img/ses-riseagain.jpg",
    "bpm": "128",
    "tono": "E maj",
    "pistas": "164",
    "portada": "img/card-riseagain.jpg",
    "audio": "audio/riseagain.mp3",
    "insignia": "Nuevo",
    "grupos": "8",
    "plugins": {
      "pct": 36,
      "serie": [
        {
          "n": "EQ Eight",
          "c": 45
        },
        {
          "n": "Delay",
          "c": 35
        },
        {
          "n": "Utility",
          "c": 23
        },
        {
          "n": "Compressor",
          "c": 21
        },
        {
          "n": "Audio Effect Rack",
          "c": 17
        },
        {
          "n": "Saturator",
          "c": 11
        },
        {
          "n": "LFO",
          "c": 10
        },
        {
          "n": "Reverb",
          "c": 9
        },
        {
          "n": "Auto Filter",
          "c": 8
        },
        {
          "n": "Glue Compressor",
          "c": 6
        },
        {
          "n": "Impulse",
          "c": 5
        },
        {
          "n": "Cabinet",
          "c": 4
        },
        {
          "n": "Chorus-Ensemble",
          "c": 4
        },
        {
          "n": "Drum Buss",
          "c": 3
        },
        {
          "n": "Limiter",
          "c": 2
        },
        {
          "n": "Multiband Dynamics",
          "c": 2
        },
        {
          "n": "Simpler",
          "c": 2
        },
        {
          "n": "Shaper",
          "c": 2
        },
        {
          "n": "Gate",
          "c": 1
        },
        {
          "n": "Overdrive",
          "c": 1
        },
        {
          "n": "Amp",
          "c": 1
        },
        {
          "n": "Instrument Rack",
          "c": 1
        }
      ],
      "terceros": [
        {
          "n": "FabFilter Pro-Q 3",
          "f": "FabFilter",
          "c": 111,
          "e": "alt",
          "a": "TDR Nova · EQ Eight de Ableton",
          "a_en": "TDR Nova · Ableton's EQ Eight"
        },
        {
          "n": "Serum 2",
          "f": "Xfer",
          "c": 46,
          "e": "alt",
          "a": "Vital",
          "a_en": "Vital"
        },
        {
          "n": "Valhalla VintageVerb",
          "f": "Valhalla",
          "c": 36,
          "e": "alt",
          "a": "Valhalla Supermassive, del mismo fabricante",
          "a_en": "Valhalla Supermassive, from the same maker"
        },
        {
          "n": "Nexus",
          "f": "reFX",
          "c": 20,
          "e": "sin",
          "a": "Es una ROMpler: no hay equivalente libre",
          "a_en": "It's a ROMpler: there's no free equivalent"
        },
        {
          "n": "Tape Stop",
          "f": "Kilohearts",
          "c": 19,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "Kickstart 2",
          "f": "Cableguys",
          "c": 13,
          "e": "alt",
          "a": "Compressor de Ableton en sidechain",
          "a_en": "Ableton's Compressor with sidechain"
        },
        {
          "n": "SSL G-Channel",
          "f": "Waves",
          "c": 13,
          "e": "alt",
          "a": "Glue Compressor + EQ Eight de Ableton",
          "a_en": "Ableton's Glue Compressor + EQ Eight"
        },
        {
          "n": "OTT",
          "f": "Xfer",
          "c": 12,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "FabFilter Saturn 2",
          "f": "FabFilter",
          "c": 11,
          "e": "alt",
          "a": "Saturator de Ableton",
          "a_en": "Ableton's Saturator"
        },
        {
          "n": "FabFilter Pro-Q 4",
          "f": "FabFilter",
          "c": 10,
          "e": "alt",
          "a": "TDR Nova · EQ Eight de Ableton",
          "a_en": "TDR Nova · Ableton's EQ Eight"
        },
        {
          "n": "Analog Lab V",
          "f": "Arturia",
          "c": 9,
          "e": "pago",
          "a": "Nexus",
          "a_en": "Nexus"
        },
        {
          "n": "ShaperBox 3",
          "f": "Cableguys",
          "c": 7,
          "e": "sin",
          "a": "Auto Filter y Auto Pan cubren parte",
          "a_en": "Auto Filter and Auto Pan cover part of it"
        },
        {
          "n": "StandardCLIP",
          "f": "Sonic Academy",
          "c": 7,
          "e": "alt",
          "a": "Saturator de Ableton en modo soft clip",
          "a_en": "Ableton's Saturator in soft clip mode"
        },
        {
          "n": "EchoBoy",
          "f": "Soundtoys",
          "c": 6,
          "e": "alt",
          "a": "Echo de Ableton",
          "a_en": "Ableton's Echo"
        },
        {
          "n": "Sylenth1",
          "f": "LennarDigital",
          "c": 6,
          "e": "alt",
          "a": "Surge XT",
          "a_en": "Surge XT"
        },
        {
          "n": "FabFilter Pro-L 2",
          "f": "FabFilter",
          "c": 6,
          "e": "alt",
          "a": "Limiter de Ableton",
          "a_en": "Ableton's Limiter"
        },
        {
          "n": "Kontakt 7",
          "f": "Native Instruments",
          "c": 4,
          "e": "alt",
          "a": "Kontakt Player, gratis",
          "a_en": "Kontakt Player, free"
        },
        {
          "n": "Kontakt 8",
          "f": "Native Instruments",
          "c": 4,
          "e": "alt",
          "a": "Kontakt Player, gratis",
          "a_en": "Kontakt Player, free"
        },
        {
          "n": "Maserati GTi",
          "f": "Waves",
          "c": 3,
          "e": "sin",
          "a": ""
        },
        {
          "n": "SSL G-Comp",
          "f": "Waves",
          "c": 3,
          "e": "alt",
          "a": "Glue Compressor de Ableton",
          "a_en": "Ableton's Glue Compressor"
        },
        {
          "n": "Valhalla FreqEcho",
          "f": "Valhalla",
          "c": 2,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "Endless Smile",
          "f": "Dada Life",
          "c": 2,
          "e": "sin",
          "a": ""
        },
        {
          "n": "RBass",
          "f": "Waves",
          "c": 2,
          "e": "sin",
          "a": ""
        },
        {
          "n": "Sausage Fattener",
          "f": "Dada Life",
          "c": 2,
          "e": "alt",
          "a": "Saturator de Ableton",
          "a_en": "Ableton's Saturator"
        },
        {
          "n": "Curves Resolve",
          "f": "Waves",
          "c": 2,
          "e": "sin",
          "a": ""
        },
        {
          "n": "Vitamin",
          "f": "Waves",
          "c": 2,
          "e": "alt",
          "a": "Multiband Dynamics de Ableton",
          "a_en": "Ableton's Multiband Dynamics"
        },
        {
          "n": "Maag EQ4",
          "f": "Plugin Alliance",
          "c": 1,
          "e": "alt",
          "a": "EQ Eight de Ableton",
          "a_en": "Ableton's EQ Eight"
        },
        {
          "n": "PTEq-X",
          "f": "Analog Obsession",
          "c": 1,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "Serum 2 FX",
          "f": "Xfer",
          "c": 1,
          "e": "alt",
          "a": "Vital",
          "a_en": "Vital"
        },
        {
          "n": "CLA-2A",
          "f": "Waves",
          "c": 1,
          "e": "alt",
          "a": "Compressor de Ableton",
          "a_en": "Ableton's Compressor"
        },
        {
          "n": "Ozone 12 Imager",
          "f": "iZotope",
          "c": 1,
          "e": "alt",
          "a": "Ozone Imager, gratis",
          "a_en": "Ozone Imager, free"
        }
      ]
    },
    "midi": "https://ianerastudio.gumroad.com/l/rise-again-midi",
    "midiQue": "Melodía y pad",
    "midiQue_en": "Melody and pad"
  },
  {
    "id": "takemethere",
    "t": "Take Me There",
    "a": "Sick Individuals &middot; Matisse &amp; Sadko &middot; Third Party",
    "y": "2025",
    "video": "_4fbpisfeiM",
    "captura": "img/ses-takemethere.jpg",
    "bpm": "130",
    "tono": "B♭ maj",
    "pistas": "96",
    "portada": "img/card-takemethere.jpg",
    "audio": "audio/takemethere.mp3",
    "insignia": "+20.000 en YouTube",
    "grupos": "8",
    "plugins": {
      "pct": 42,
      "serie": [
        {
          "n": "Utility",
          "c": 24
        },
        {
          "n": "LFO",
          "c": 12
        },
        {
          "n": "EQ Eight",
          "c": 9
        },
        {
          "n": "Simpler",
          "c": 8
        },
        {
          "n": "Instrument Rack",
          "c": 8
        },
        {
          "n": "Shaper",
          "c": 8
        },
        {
          "n": "Audio Effect Rack",
          "c": 7
        },
        {
          "n": "Compressor",
          "c": 5
        },
        {
          "n": "Auto Filter",
          "c": 4
        },
        {
          "n": "Reverb",
          "c": 4
        },
        {
          "n": "Impulse",
          "c": 4
        },
        {
          "n": "Gate",
          "c": 3
        },
        {
          "n": "Drum Buss",
          "c": 2
        },
        {
          "n": "Multiband Dynamics",
          "c": 2
        },
        {
          "n": "Delay",
          "c": 2
        },
        {
          "n": "Note Length",
          "c": 2
        },
        {
          "n": "Glue Compressor",
          "c": 1
        },
        {
          "n": "Limiter",
          "c": 1
        },
        {
          "n": "Saturator",
          "c": 1
        },
        {
          "n": "Overdrive",
          "c": 1
        },
        {
          "n": "Chorus-Ensemble",
          "c": 1
        }
      ],
      "terceros": [
        {
          "n": "FabFilter Pro-Q 3",
          "f": "FabFilter",
          "c": 49,
          "e": "alt",
          "a": "TDR Nova · EQ Eight de Ableton",
          "a_en": "TDR Nova · Ableton's EQ Eight"
        },
        {
          "n": "Serum 2",
          "f": "Xfer",
          "c": 18,
          "e": "alt",
          "a": "Vital",
          "a_en": "Vital"
        },
        {
          "n": "Kickstart 2",
          "f": "Cableguys",
          "c": 15,
          "e": "alt",
          "a": "Compressor de Ableton en sidechain",
          "a_en": "Ableton's Compressor with sidechain"
        },
        {
          "n": "Nexus",
          "f": "reFX",
          "c": 10,
          "e": "sin",
          "a": "Es una ROMpler: no hay equivalente libre",
          "a_en": "It's a ROMpler: there's no free equivalent"
        },
        {
          "n": "Valhalla VintageVerb",
          "f": "Valhalla",
          "c": 8,
          "e": "alt",
          "a": "Valhalla Supermassive, del mismo fabricante",
          "a_en": "Valhalla Supermassive, from the same maker"
        },
        {
          "n": "SSL G-Channel",
          "f": "Waves",
          "c": 6,
          "e": "alt",
          "a": "Glue Compressor + EQ Eight de Ableton",
          "a_en": "Ableton's Glue Compressor + EQ Eight"
        },
        {
          "n": "FabFilter Saturn 2",
          "f": "FabFilter",
          "c": 5,
          "e": "alt",
          "a": "Saturator de Ableton",
          "a_en": "Ableton's Saturator"
        },
        {
          "n": "OTT",
          "f": "Xfer",
          "c": 4,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "FabFilter Pro-L 2",
          "f": "FabFilter",
          "c": 4,
          "e": "alt",
          "a": "Limiter de Ableton",
          "a_en": "Ableton's Limiter"
        },
        {
          "n": "Clipper",
          "f": "Kilohearts",
          "c": 3,
          "e": "alt",
          "a": "Saturator de Ableton en modo soft clip",
          "a_en": "Ableton's Saturator in soft clip mode"
        },
        {
          "n": "EchoBoy",
          "f": "Soundtoys",
          "c": 3,
          "e": "alt",
          "a": "Echo de Ableton",
          "a_en": "Ableton's Echo"
        },
        {
          "n": "Sylenth1",
          "f": "LennarDigital",
          "c": 3,
          "e": "alt",
          "a": "Surge XT",
          "a_en": "Surge XT"
        },
        {
          "n": "Kontakt 7",
          "f": "Native Instruments",
          "c": 3,
          "e": "alt",
          "a": "Kontakt Player, gratis",
          "a_en": "Kontakt Player, free"
        },
        {
          "n": "PTEq-X",
          "f": "Analog Obsession",
          "c": 2,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "Valhalla FreqEcho",
          "f": "Valhalla",
          "c": 2,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "Endless Smile",
          "f": "Dada Life",
          "c": 2,
          "e": "sin",
          "a": ""
        },
        {
          "n": "Tape Stop",
          "f": "Kilohearts",
          "c": 2,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "ShaperBox 3",
          "f": "Cableguys",
          "c": 2,
          "e": "sin",
          "a": "Auto Filter y Auto Pan cubren parte",
          "a_en": "Auto Filter and Auto Pan cover part of it"
        },
        {
          "n": "SSL G-Comp",
          "f": "Waves",
          "c": 2,
          "e": "alt",
          "a": "Glue Compressor de Ableton",
          "a_en": "Ableton's Glue Compressor"
        },
        {
          "n": "CLA-2A",
          "f": "Waves",
          "c": 2,
          "e": "alt",
          "a": "Compressor de Ableton",
          "a_en": "Ableton's Compressor"
        },
        {
          "n": "Ozone 5 Dynamics",
          "f": "iZotope",
          "c": 1,
          "e": "alt",
          "a": "Multiband Dynamics de Ableton",
          "a_en": "Ableton's Multiband Dynamics"
        },
        {
          "n": "RBass",
          "f": "Waves",
          "c": 1,
          "e": "sin",
          "a": ""
        },
        {
          "n": "TDR Kotelnikov",
          "f": "Tokyo Dawn",
          "c": 1,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "BBC Symphony Orchestra",
          "f": "Spitfire",
          "c": 1,
          "e": "alt",
          "a": "BBC Symphony Discover, gratis",
          "a_en": "BBC Symphony Discover, free"
        },
        {
          "n": "Ozone 5 Imager",
          "f": "iZotope",
          "c": 1,
          "e": "alt",
          "a": "Ozone Imager, gratis",
          "a_en": "Ozone Imager, free"
        },
        {
          "n": "FasterMaster",
          "f": "Mastering The Mix",
          "c": 1,
          "e": "alt",
          "a": "Limiter + EQ Eight de Ableton",
          "a_en": "Ableton's Limiter + EQ Eight"
        }
      ]
    },
    "midi": "https://ianerastudio.gumroad.com/l/take-me-there-midi",
    "midiQue": "Acordes y melodía",
    "midiQue_en": "Chords and melody"
  },
  {
    "id": "blessings",
    "t": "Blessings",
    "a": "Calvin Harris",
    "y": "2026",
    "video": "Bw8bwS2JOoo",
    "captura": "img/ses-blessings.jpg",
    "bpm": "130",
    "tono": "B min",
    "pistas": "54",
    "portada": "img/card-blessings.jpg",
    "audio": "audio/blessings.mp3",
    "insignia": null,
    "grupos": "8",
    "plugins": {
      "pct": 70,
      "serie": [
        {
          "n": "EQ Eight",
          "c": 36
        },
        {
          "n": "Compressor",
          "c": 13
        },
        {
          "n": "Utility",
          "c": 11
        },
        {
          "n": "Delay",
          "c": 10
        },
        {
          "n": "Reverb",
          "c": 8
        },
        {
          "n": "Audio Effect Rack",
          "c": 6
        },
        {
          "n": "Drum Buss",
          "c": 5
        },
        {
          "n": "Cabinet",
          "c": 4
        },
        {
          "n": "Instrument Rack",
          "c": 4
        },
        {
          "n": "LFO",
          "c": 3
        },
        {
          "n": "Multiband Dynamics",
          "c": 2
        },
        {
          "n": "Simpler",
          "c": 2
        },
        {
          "n": "Impulse",
          "c": 2
        },
        {
          "n": "Shaper",
          "c": 2
        },
        {
          "n": "Channel EQ",
          "c": 1
        },
        {
          "n": "Glue Compressor",
          "c": 1
        },
        {
          "n": "Limiter",
          "c": 1
        },
        {
          "n": "Gate",
          "c": 1
        },
        {
          "n": "Vinyl Distortion",
          "c": 1
        },
        {
          "n": "Amp",
          "c": 1
        },
        {
          "n": "Auto Filter",
          "c": 1
        },
        {
          "n": "Echo",
          "c": 1
        },
        {
          "n": "Chorus-Ensemble",
          "c": 1
        },
        {
          "n": "Phaser-Flanger",
          "c": 1
        },
        {
          "n": "Tuner",
          "c": 1
        }
      ],
      "terceros": [
        {
          "n": "Kickstart 2",
          "f": "Cableguys",
          "c": 11,
          "e": "alt",
          "a": "Compressor de Ableton en sidechain",
          "a_en": "Ableton's Compressor with sidechain"
        },
        {
          "n": "Serum 2",
          "f": "Xfer",
          "c": 7,
          "e": "alt",
          "a": "Vital",
          "a_en": "Vital"
        },
        {
          "n": "FabFilter Pro-Q 4",
          "f": "FabFilter",
          "c": 7,
          "e": "alt",
          "a": "TDR Nova · EQ Eight de Ableton",
          "a_en": "TDR Nova · Ableton's EQ Eight"
        },
        {
          "n": "Valhalla VintageVerb",
          "f": "Valhalla",
          "c": 6,
          "e": "alt",
          "a": "Valhalla Supermassive, del mismo fabricante",
          "a_en": "Valhalla Supermassive, from the same maker"
        },
        {
          "n": "Curves Resolve",
          "f": "Waves",
          "c": 4,
          "e": "sin",
          "a": ""
        },
        {
          "n": "OTT",
          "f": "Xfer",
          "c": 2,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "Endless Smile",
          "f": "Dada Life",
          "c": 2,
          "e": "sin",
          "a": ""
        },
        {
          "n": "CLA-2A",
          "f": "Waves",
          "c": 1,
          "e": "alt",
          "a": "Compressor de Ableton",
          "a_en": "Ableton's Compressor"
        },
        {
          "n": "Ozone 12 Imager",
          "f": "iZotope",
          "c": 1,
          "e": "alt",
          "a": "Ozone Imager, gratis",
          "a_en": "Ozone Imager, free"
        },
        {
          "n": "SSL G-Channel",
          "f": "Waves",
          "c": 1,
          "e": "alt",
          "a": "Glue Compressor + EQ Eight de Ableton",
          "a_en": "Ableton's Glue Compressor + EQ Eight"
        },
        {
          "n": "Kontakt 8",
          "f": "Native Instruments",
          "c": 1,
          "e": "alt",
          "a": "Kontakt Player, gratis",
          "a_en": "Kontakt Player, free"
        },
        {
          "n": "FabFilter Saturn 2",
          "f": "FabFilter",
          "c": 1,
          "e": "alt",
          "a": "Saturator de Ableton",
          "a_en": "Ableton's Saturator"
        },
        {
          "n": "EchoBoy",
          "f": "Soundtoys",
          "c": 1,
          "e": "alt",
          "a": "Echo de Ableton",
          "a_en": "Ableton's Echo"
        },
        {
          "n": "SSL G-Comp",
          "f": "Waves",
          "c": 1,
          "e": "alt",
          "a": "Glue Compressor de Ableton",
          "a_en": "Ableton's Glue Compressor"
        },
        {
          "n": "FabFilter Pro-Q 3",
          "f": "FabFilter",
          "c": 1,
          "e": "alt",
          "a": "TDR Nova · EQ Eight de Ableton",
          "a_en": "TDR Nova · Ableton's EQ Eight"
        },
        {
          "n": "FabFilter Pro-L 2",
          "f": "FabFilter",
          "c": 1,
          "e": "alt",
          "a": "Limiter de Ableton",
          "a_en": "Ableton's Limiter"
        },
        {
          "n": "FasterMaster",
          "f": "Mastering The Mix",
          "c": 1,
          "e": "alt",
          "a": "Limiter + EQ Eight de Ableton",
          "a_en": "Ableton's Limiter + EQ Eight"
        },
        {
          "n": "FabFilter Pro-MB",
          "f": "FabFilter",
          "c": 1,
          "e": "alt",
          "a": "Multiband Dynamics de Ableton",
          "a_en": "Ableton's Multiband Dynamics"
        }
      ]
    },
    "midi": "https://ianerastudio.gumroad.com/l/blessings-midi",
    "midiQue": "La guitarra",
    "midiQue_en": "The guitar"
  },
  {
    "id": "harmony",
    "t": "Harmony",
    "a": "Matisse &amp; Sadko",
    "y": "2025",
    "video": "oZLm6RlccBc",
    "captura": "img/ses-harmony.jpg",
    "bpm": "130",
    "tono": "F min",
    "pistas": "131",
    "portada": "img/card-harmony.jpg",
    "audio": "audio/harmony.mp3",
    "insignia": null,
    "grupos": "12",
    "plugins": {
      "pct": 61,
      "serie": [
        {
          "n": "EQ Eight",
          "c": 123
        },
        {
          "n": "Utility",
          "c": 20
        },
        {
          "n": "Audio Effect Rack",
          "c": 12
        },
        {
          "n": "Compressor",
          "c": 11
        },
        {
          "n": "LFO",
          "c": 11
        },
        {
          "n": "Delay",
          "c": 9
        },
        {
          "n": "Auto Filter",
          "c": 8
        },
        {
          "n": "Reverb",
          "c": 4
        },
        {
          "n": "Impulse",
          "c": 4
        },
        {
          "n": "Filter Delay",
          "c": 2
        },
        {
          "n": "Glue Compressor",
          "c": 1
        },
        {
          "n": "Limiter",
          "c": 1
        },
        {
          "n": "Gate",
          "c": 1
        },
        {
          "n": "Drum Buss",
          "c": 1
        },
        {
          "n": "Multiband Dynamics",
          "c": 1
        },
        {
          "n": "Saturator",
          "c": 1
        },
        {
          "n": "Auto Pan",
          "c": 1
        },
        {
          "n": "Phaser",
          "c": 1
        },
        {
          "n": "Corpus",
          "c": 1
        },
        {
          "n": "Simpler",
          "c": 1
        },
        {
          "n": "Envelope Follower",
          "c": 1
        },
        {
          "n": "Shaper",
          "c": 1
        }
      ],
      "terceros": [
        {
          "n": "FabFilter Pro-Q 3",
          "f": "FabFilter",
          "c": 33,
          "e": "alt",
          "a": "TDR Nova · EQ Eight de Ableton",
          "a_en": "TDR Nova · Ableton's EQ Eight"
        },
        {
          "n": "Kickstart 2",
          "f": "Cableguys",
          "c": 23,
          "e": "alt",
          "a": "Compressor de Ableton en sidechain",
          "a_en": "Ableton's Compressor with sidechain"
        },
        {
          "n": "Serum",
          "f": "Xfer",
          "c": 17,
          "e": "alt",
          "a": "Vital",
          "a_en": "Vital"
        },
        {
          "n": "OTT",
          "f": "Xfer",
          "c": 10,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "Sylenth1",
          "f": "LennarDigital",
          "c": 9,
          "e": "alt",
          "a": "Surge XT",
          "a_en": "Surge XT"
        },
        {
          "n": "Gullfoss",
          "f": "Soundtheory",
          "c": 6,
          "e": "sin",
          "a": ""
        },
        {
          "n": "BBC Symphony Orchestra",
          "f": "Spitfire",
          "c": 6,
          "e": "alt",
          "a": "BBC Symphony Discover, gratis",
          "a_en": "BBC Symphony Discover, free"
        },
        {
          "n": "CamelCrusher",
          "f": "Camel Audio",
          "c": 5,
          "e": "gratis",
          "a": ""
        },
        {
          "n": "Nexus",
          "f": "reFX",
          "c": 4,
          "e": "sin",
          "a": "Es una ROMpler: no hay equivalente libre",
          "a_en": "It's a ROMpler: there's no free equivalent"
        },
        {
          "n": "Valhalla VintageVerb",
          "f": "Valhalla",
          "c": 3,
          "e": "alt",
          "a": "Valhalla Supermassive, del mismo fabricante",
          "a_en": "Valhalla Supermassive, from the same maker"
        },
        {
          "n": "Eos 2",
          "f": "Audio Damage",
          "c": 3,
          "e": "alt",
          "a": "Reverb de Ableton",
          "a_en": "Ableton's Reverb"
        },
        {
          "n": "EchoBoy",
          "f": "Soundtoys",
          "c": 3,
          "e": "alt",
          "a": "Echo de Ableton",
          "a_en": "Ableton's Echo"
        },
        {
          "n": "ShaperBox 3",
          "f": "Cableguys",
          "c": 3,
          "e": "sin",
          "a": "Auto Filter y Auto Pan cubren parte",
          "a_en": "Auto Filter and Auto Pan cover part of it"
        },
        {
          "n": "Vitamin",
          "f": "Waves",
          "c": 3,
          "e": "alt",
          "a": "Multiband Dynamics de Ableton",
          "a_en": "Ableton's Multiband Dynamics"
        },
        {
          "n": "SSL G-Comp",
          "f": "Waves",
          "c": 3,
          "e": "alt",
          "a": "Glue Compressor de Ableton",
          "a_en": "Ableton's Glue Compressor"
        },
        {
          "n": "Sausage Fattener",
          "f": "Dada Life",
          "c": 2,
          "e": "alt",
          "a": "Saturator de Ableton",
          "a_en": "Ableton's Saturator"
        },
        {
          "n": "Addictive Keys",
          "f": "XLN Audio",
          "c": 1,
          "e": "alt",
          "a": "Los pianos de la Core Library de Live",
          "a_en": "The pianos in Live's Core Library"
        },
        {
          "n": "Guitar Rig 5",
          "f": "Native Instruments",
          "c": 1,
          "e": "alt",
          "a": "Guitar Rig Player, gratis",
          "a_en": "Guitar Rig Player, free"
        },
        {
          "n": "Spire",
          "f": "Reveal Sound",
          "c": 1,
          "e": "alt",
          "a": "Surge XT",
          "a_en": "Surge XT"
        },
        {
          "n": "Kontakt 7",
          "f": "Native Instruments",
          "c": 1,
          "e": "alt",
          "a": "Kontakt Player, gratis",
          "a_en": "Kontakt Player, free"
        },
        {
          "n": "Ozone 5 Imager",
          "f": "iZotope",
          "c": 1,
          "e": "alt",
          "a": "Ozone Imager, gratis",
          "a_en": "Ozone Imager, free"
        },
        {
          "n": "FabFilter Pro-L 2",
          "f": "FabFilter",
          "c": 1,
          "e": "alt",
          "a": "Limiter de Ableton",
          "a_en": "Ableton's Limiter"
        },
        {
          "n": "FasterMaster",
          "f": "Mastering The Mix",
          "c": 1,
          "e": "alt",
          "a": "Limiter + EQ Eight de Ableton",
          "a_en": "Ableton's Limiter + EQ Eight"
        },
        {
          "n": "SPAN",
          "f": "Voxengo",
          "c": 1,
          "e": "gratis",
          "a": ""
        }
      ]
    },
    "midi": "https://ianerastudio.gumroad.com/l/harmony-midi",
    "midiQue": "Piano y pads con strings",
    "midiQue_en": "Piano and pads with strings"
  },
  {
    "id": "caramelle",
    "t": "Caramelle",
    "a": "Mesto",
    "y": "2026",
    "video": "qOChu1JnFwk",
    "captura": "img/ses-caramelle.jpg",
    "bpm": "128",
    "tono": "E♭ maj",
    "pistas": "32",
    "portada": "img/card-caramelle.jpg",
    "audio": "audio/caramelle.mp3",
    "insignia": null,
    "grupos": "8",
    "plugins": {
      "pct": 33,
      "serie": [
        {
          "n": "Utility",
          "c": 6
        },
        {
          "n": "EQ Eight",
          "c": 5
        },
        {
          "n": "Delay",
          "c": 2
        },
        {
          "n": "Reverb",
          "c": 2
        },
        {
          "n": "Compressor",
          "c": 1
        },
        {
          "n": "Glue Compressor",
          "c": 1
        },
        {
          "n": "Gate",
          "c": 1
        },
        {
          "n": "Multiband Dynamics",
          "c": 1
        },
        {
          "n": "Audio Effect Rack",
          "c": 1
        }
      ],
      "terceros": [
        {
          "n": "FabFilter Pro-Q 3",
          "f": "FabFilter",
          "c": 8,
          "e": "alt",
          "a": "TDR Nova · EQ Eight de Ableton",
          "a_en": "TDR Nova · Ableton's EQ Eight"
        },
        {
          "n": "Kickstart 2",
          "f": "Cableguys",
          "c": 7,
          "e": "alt",
          "a": "Compressor de Ableton en sidechain",
          "a_en": "Ableton's Compressor with sidechain"
        },
        {
          "n": "Serum 2",
          "f": "Xfer",
          "c": 4,
          "e": "alt",
          "a": "Vital",
          "a_en": "Vital"
        },
        {
          "n": "Decapitator",
          "f": "Soundtoys",
          "c": 4,
          "e": "alt",
          "a": "Saturator u Overdrive de Ableton",
          "a_en": "Ableton's Saturator or Overdrive"
        },
        {
          "n": "Valhalla VintageVerb",
          "f": "Valhalla",
          "c": 4,
          "e": "alt",
          "a": "Valhalla Supermassive, del mismo fabricante",
          "a_en": "Valhalla Supermassive, from the same maker"
        },
        {
          "n": "Endless Smile",
          "f": "Dada Life",
          "c": 2,
          "e": "sin",
          "a": ""
        },
        {
          "n": "FabFilter Pro-Q 4",
          "f": "FabFilter",
          "c": 2,
          "e": "alt",
          "a": "TDR Nova · EQ Eight de Ableton",
          "a_en": "TDR Nova · Ableton's EQ Eight"
        },
        {
          "n": "Ozone 12 Bass Control",
          "f": "iZotope",
          "c": 1,
          "e": "sin",
          "a": ""
        },
        {
          "n": "EchoBoy",
          "f": "Soundtoys",
          "c": 1,
          "e": "alt",
          "a": "Echo de Ableton",
          "a_en": "Ableton's Echo"
        },
        {
          "n": "Nexus",
          "f": "reFX",
          "c": 1,
          "e": "sin",
          "a": "Es una ROMpler: no hay equivalente libre",
          "a_en": "It's a ROMpler: there's no free equivalent"
        },
        {
          "n": "Maserati GTi",
          "f": "Waves",
          "c": 1,
          "e": "sin",
          "a": ""
        },
        {
          "n": "Sylenth1",
          "f": "LennarDigital",
          "c": 1,
          "e": "alt",
          "a": "Surge XT",
          "a_en": "Surge XT"
        },
        {
          "n": "FabFilter Saturn 2",
          "f": "FabFilter",
          "c": 1,
          "e": "alt",
          "a": "Saturator de Ableton",
          "a_en": "Ableton's Saturator"
        },
        {
          "n": "SSL G-Comp",
          "f": "Waves",
          "c": 1,
          "e": "alt",
          "a": "Glue Compressor de Ableton",
          "a_en": "Ableton's Glue Compressor"
        },
        {
          "n": "FabFilter Pro-L 2",
          "f": "FabFilter",
          "c": 1,
          "e": "alt",
          "a": "Limiter de Ableton",
          "a_en": "Ableton's Limiter"
        },
        {
          "n": "FasterMaster",
          "f": "Mastering The Mix",
          "c": 1,
          "e": "alt",
          "a": "Limiter + EQ Eight de Ableton",
          "a_en": "Ableton's Limiter + EQ Eight"
        }
      ]
    },
    "midi": "https://ianerastudio.gumroad.com/l/caramelle-midi",
    "midiQue": "Acordes y lead",
    "midiQue_en": "Chords and lead"
  }
];

var VIDEOS = [
  {
    "f": "02 mar 2026",
    "t": "Cómo hizo Calvin Harris «Blessings»",
    "id": "Bw8bwS2JOoo",
    "t_en": "How Calvin Harris made “Blessings”",
    "f_en": "Mar 02 2026"
  },
  {
    "f": "14 ene 2026",
    "t": "Cómo hizo Mesto «Caramelle»",
    "id": "qOChu1JnFwk",
    "t_en": "How Mesto made “Caramelle”",
    "f_en": "Jan 14 2026"
  },
  {
    "f": "16 dic 2025",
    "t": "Cómo hicieron Matisse &amp; Sadko «Harmony»",
    "id": "oZLm6RlccBc",
    "t_en": "How Matisse &amp; Sadko made “Harmony”",
    "f_en": "Dec 16 2025"
  },
  {
    "f": "06 nov 2025",
    "t": "Cómo hicieron «Take Me There»",
    "id": "_4fbpisfeiM",
    "t_en": "How Matisse &amp; Sadko and Third Party made “Take Me There”",
    "f_en": "Nov 06 2025"
  }
];

var CONTACTO = {"instagram":"https://instagram.com/ianerastudio","correo":null};

/* Una pregunta con r:null NO se pinta. */
var FAQ = [
  {
    "p": "¿Qué versión de Ableton Live necesito?",
    "r": "Live 12. Los proyectos están guardados con la 12.4.3.",
    "p_en": "Which version of Ableton Live do I need?",
    "r_en": "Live 12. The projects are saved with 12.4.3."
  },
  {
    "p": "¿Necesito plugins de pago?",
    "r": "Uso los estándar de la industria, no cosas raras: si produces, la mayoría ya los tienes. Y casi la mitad del procesado son dispositivos que Live ya trae — si te falta alguno de pago, el archivo se abre igual: Live lo marca y el arreglo sigue entero. En el detalle de cada proyecto de esta web, en «Con qué está hecho», tienes la lista exacta con los plugins utilizados y una alternativa gratis a los de pago. Así puedes estar seguro antes de descargar nada.",
    "p_en": "Do I need paid plugins?",
    "r_en": "I use the industry standards, nothing strange: if you produce, you'll already have most of them. And almost half the processing is devices Live ships with — if you're missing a paid one, the file still opens: Live flags it and the arrangement stays intact. In each project's detail on this site, under “What it's built with”, you'll find the exact list of plugins used and a free alternative to the paid ones. So you can be sure before you download anything."
  },
  {
    "p": "¿Cómo lo recibo?",
    "r": "Descarga inmediata en cuanto se confirma el pago. Sin esperas y sin envíos: el pago y la entrega los gestiona Gumroad.",
    "p_en": "How do I get it?",
    "r_en": "Instant download as soon as the payment goes through. No waiting and no shipping: Gumroad handles the payment and the delivery."
  },
  {
    "p": "¿Puedo publicar lo que haga con el proyecto?",
    "r": "Sí, sin pedirme permiso. Lo único que no puedes es revender ni redistribuir el archivo del proyecto tal cual. Y si sacas algo hecho con ella, mándamelo por Instagram: me gusta oír dónde acaba cada sesión, y lo escucho yo.",
    "p_en": "Can I release what I make with the project?",
    "r_en": "Yes, without asking me. The only thing you can't do is resell or redistribute the project file itself. And if you release something made with it, send it to me on Instagram — I genuinely want to hear where each session ends up."
  },
  {
    "p": "¿Y si me atasco o algo no me abre?",
    "r": "Lo normal es que no pase nada: son archivos que abro yo a diario y salen del mismo Ableton con el que trabajo. Si aun así algo no te carga o no lo encuentras, escríbeme por Instagram y lo miramos — sé dónde pueden dar guerra y suele resolverse en un par de mensajes.",
    "p_en": "What if I get stuck or something won't open?",
    "r_en": "Normally nothing goes wrong: these are files I open every day, out of the same Ableton I work in. If something still won't load or you can't find it, write me on Instagram and we'll look at it — I know where these can give trouble and it usually takes a couple of messages."
  }
];

/* Vacío = la sección de reseñas no se pinta. Solo reseñas reales. */
var RESENAS = [];
