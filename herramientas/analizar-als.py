#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Lee un .als y escribe en contenido.json las pistas, los grupos y los
plugins de ese proyecto. Así el dato sale del archivo, no de la memoria.

    ./herramientas/analizar-als.py riseagain "/ruta/al/Proyecto.als"

Después: ./herramientas/publicar.sh "plugins de X"
"""
import re, gzip, json, sys, os, collections

# Nombre que se ve en Ableton -> (nombre limpio, fabricante, estado, alternativa)
# estado: "gratis" | "alt" (hay equivalente gratis) | "sin" (no hay equivalente claro)
CANON = {
 "Pro-Q 3":("FabFilter Pro-Q 3","FabFilter","alt","TDR Nova · EQ Eight de Ableton"),
 "FabFilter Pro-Q 3":("FabFilter Pro-Q 3","FabFilter","alt","TDR Nova · EQ Eight de Ableton"),
 "Pro-Q 4":("FabFilter Pro-Q 4","FabFilter","alt","TDR Nova · EQ Eight de Ableton"),
 "FabFilter Pro-Q 4":("FabFilter Pro-Q 4","FabFilter","alt","TDR Nova · EQ Eight de Ableton"),
 "Pro-L 2":("FabFilter Pro-L 2","FabFilter","alt","Limiter de Ableton"),
 "Pro-MB":("FabFilter Pro-MB","FabFilter","alt","Multiband Dynamics de Ableton"),
 "Saturn 2":("FabFilter Saturn 2","FabFilter","alt","Saturator de Ableton"),
 "Serum 2":("Serum 2","Xfer","alt","Vital"),
 "Serum":("Serum","Xfer","alt","Vital"),
 "Serum_x64":("Serum","Xfer","alt","Vital"),
 "Serum 2 FX":("Serum 2 FX","Xfer","alt","Vital"),
 "Sylenth1":("Sylenth1","LennarDigital","alt","Surge XT"),
 "Spire-1.1":("Spire","Reveal Sound","alt","Surge XT"),
 "Nexus":("Nexus","reFX","sin","Es una ROMpler: no hay equivalente libre"),
 "OTT":("OTT","Xfer","gratis",""),
 "OTT_x64":("OTT","Xfer","gratis",""),
 "kHs Tape Stop":("Tape Stop","Kilohearts","gratis",""),
 "kHs Clipper":("Clipper","Kilohearts","alt","Saturator de Ableton en modo soft clip"),
 "StandardCLIP":("StandardCLIP","Sonic Academy","alt","Saturator de Ableton en modo soft clip"),
 "ValhallaVintageVerb":("Valhalla VintageVerb","Valhalla","alt","Valhalla Supermassive, del mismo fabricante"),
 "ValhallaVintageVerb_x64":("Valhalla VintageVerb","Valhalla","alt","Valhalla Supermassive, del mismo fabricante"),
 "ValhallaFreqEcho":("Valhalla FreqEcho","Valhalla","gratis",""),
 "ValhallaFreqEcho_x64":("Valhalla FreqEcho","Valhalla","gratis",""),
 "Kickstart 2":("Kickstart 2","Cableguys","alt","Compressor de Ableton en sidechain"),
 "Kickstart-64bit":("Kickstart 2","Cableguys","alt","Compressor de Ableton en sidechain"),
 "ShaperBox 3":("ShaperBox 3","Cableguys","sin","Auto Filter y Auto Pan cubren parte"),
 "EchoBoy":("EchoBoy","Soundtoys","alt","Echo de Ableton"),
 "Decapitator":("Decapitator","Soundtoys","alt","Saturator u Overdrive de Ableton"),
 "Endless Smile":("Endless Smile","Dada Life","sin",""),
 "Dada Life Endless Smile x64":("Endless Smile","Dada Life","sin",""),
 "SausageFattener":("Sausage Fattener","Dada Life","alt","Saturator de Ableton"),
 "Dada Life Sausage Fattener x64":("Sausage Fattener","Dada Life","alt","Saturator de Ableton"),
 "SSLGChannel Stereo":("SSL G-Channel","Waves","alt","Glue Compressor + EQ Eight de Ableton"),
 "SSLComp Stereo":("SSL G-Comp","Waves","alt","Glue Compressor de Ableton"),
 "SSLComp Mono":("SSL G-Comp","Waves","alt","Glue Compressor de Ableton"),
 "SSLChannel (s)":("SSL E-Channel","Waves","alt","Glue Compressor + EQ Eight de Ableton"),
 "CLA-2A Stereo":("CLA-2A","Waves","alt","Compressor de Ableton"),
 "RBass Mono":("RBass","Waves","sin",""),
 "Maserati GTi Stereo":("Maserati GTi","Waves","sin",""),
 "Vitamin Stereo":("Vitamin","Waves","alt","Multiband Dynamics de Ableton"),
 "Curves Resolve Stereo":("Curves Resolve","Waves","sin",""),
 "Curves Resolve Mono":("Curves Resolve","Waves","sin",""),
 "Maag EQ4":("Maag EQ4","Plugin Alliance","alt","EQ Eight de Ableton"),
 "PTEq-X":("PTEq-X","Analog Obsession","gratis",""),
 "SPAN":("SPAN","Voxengo","gratis",""),
 "TDR Kotelnikov":("TDR Kotelnikov","Tokyo Dawn","gratis",""),
 "CamelCrusher":("CamelCrusher","Camel Audio","gratis",""),
 "Gullfoss":("Gullfoss","Soundtheory","sin",""),
 "Eos 2":("Eos 2","Audio Damage","alt","Reverb de Ableton"),
 "Guitar Rig 5":("Guitar Rig 5","Native Instruments","alt","Guitar Rig Player, gratis"),
 "Addictive Keys":("Addictive Keys","XLN Audio","alt","Los pianos de la Core Library de Live"),
 "Kontakt 7":("Kontakt 7","Native Instruments","alt","Kontakt Player, gratis"),
 "Kontakt 8":("Kontakt 8","Native Instruments","alt","Kontakt Player, gratis"),
 "BBC Symphony Orchestra":("BBC Symphony Orchestra","Spitfire","alt","BBC Symphony Discover, gratis"),
 "Analog Lab V":("Analog Lab V","Arturia","sin",""),
 "Ozone 12 Imager":("Ozone 12 Imager","iZotope","alt","Ozone Imager, gratis"),
 "iZotope Ozone 5 Imager":("Ozone 5 Imager","iZotope","alt","Ozone Imager, gratis"),
 "iZotope Ozone 5 Dynamics":("Ozone 5 Dynamics","iZotope","alt","Multiband Dynamics de Ableton"),
 "Ozone 12 Bass Control":("Ozone 12 Bass Control","iZotope","sin",""),
 "FASTERMASTER":("FasterMaster","Mastering The Mix","alt","Limiter + EQ Eight de Ableton"),
 "Transient Shaper":("Transient Shaper","—","alt","Drum Buss de Ableton"),
 "KSHMR Essentials Kick":("KSHMR Essentials Kick","Excite Audio","sin",""),
 "UADx Pultec EQP-1A EQ":("Pultec EQP-1A","Universal Audio","alt","EQ Eight de Ableton"),
 "IE_BRASS":("Impact Soundworks · Brass","—","sin",""),
 "IE_TENSION":("Impact Soundworks · Tension","—","sin",""),
 "IE_SAW_PAD":("Impact Soundworks · Saw Pad","—","sin",""),
}
INSTRUMENTOS = {"Serum 2","Serum","Sylenth1","Nexus","Spire","Analog Lab V","Kontakt 7","Kontakt 8",
                "BBC Symphony Orchestra","Addictive Keys"}

UI = {
 "Eq8":"EQ Eight","Eq3":"EQ Three","ChannelEq":"Channel EQ","Compressor2":"Compressor",
 "GlueCompressor":"Glue Compressor","Limiter":"Limiter","Gate":"Gate","DrumBuss":"Drum Buss",
 "MultibandDynamics":"Multiband Dynamics","Saturator":"Saturator","Overdrive":"Overdrive",
 "Tube":"Dynamic Tube","Erosion":"Erosion","Redux2":"Redux","Vinyl":"Vinyl Distortion",
 "Amp":"Amp","Cabinet":"Cabinet","Pedal":"Pedal","Roar":"Roar","AutoFilter":"Auto Filter",
 "AutoPan":"Auto Pan","Delay":"Delay","CrossDelay":"Ping Pong Delay","FilterDelay":"Filter Delay",
 "Echo":"Echo","Reverb":"Reverb","HybridReverb":"Hybrid Reverb","Chorus2":"Chorus-Ensemble",
 "Flanger":"Flanger","PhaserNew":"Phaser-Flanger","Phaser":"Phaser","FrequencyShifter":"Frequency Shifter",
 "Shifter":"Shifter","SpectralResonator":"Spectral Resonator","Resonators":"Resonators",
 "Corpus":"Corpus","Vocoder":"Vocoder","BeatRepeat":"Beat Repeat","Looper":"Looper",
 "StereoGain":"Utility","Tuner":"Tuner","Spectrum":"Spectrum","Operator":"Operator",
 "Wavetable":"Wavetable","OriginalSimpler":"Simpler","MultiSampler":"Sampler",
 "Collision":"Collision","Electric":"Electric","Tension":"Tension","InstrumentImpulse":"Impulse",
 "UltraAnalog":"Analog","DrumGroupDevice":"Drum Rack","AudioEffectGroupDevice":"Audio Effect Rack",
 "InstrumentGroupDevice":"Instrument Rack","MidiEffectGroupDevice":"MIDI Effect Rack",
 "MidiArpeggiator":"Arpeggiator","MidiScale":"Scale","MidiChord":"Chord","MidiPitcher":"Pitch",
 "MidiVelocity":"Velocity","MidiNoteLength":"Note Length","MidiRandom":"Random",
 "Lfo":"LFO","EnvelopeFollower":"Envelope Follower","Shaper":"Shaper","Compressor":"Compressor",
}

def analizar(ruta):
    s = gzip.open(ruta, "rt", encoding="utf-8", errors="replace").read()

    ver = re.search(r'Creator="Ableton Live ([^"]*)"', s)

    # pistas y bloques: TrackGroupId -1 = está en la raíz
    tr = list(re.finditer(r'<(MidiTrack|AudioTrack|GroupTrack)\b[^>]*>', s))
    pistas = raiz = grupos = 0
    for i, m in enumerate(tr):
        fin = tr[i+1].start() if i+1 < len(tr) else len(s)
        g = re.search(r'<TrackGroupId Value="(-?\d+)"', s[m.start():fin])
        if not g: continue
        pistas += 1
        if g.group(1) == "-1":
            raiz += 1
            if m.group(1) == "GroupTrack": grupos += 1

    # VST2 -> <PlugName>. VST3 y AU -> <Name .../> seguido de <Uid>
    bruto = collections.Counter()
    for m in re.finditer(r'<PlugName Value="([^"]+)"', s): bruto[m.group(1).strip()] += 1
    for m in re.finditer(r'<Name Value="([^"]+)"\s*/>\s*<Uid>', s): bruto[m.group(1).strip()] += 1

    terceros = collections.OrderedDict()
    desconocidos = []
    for n, c in bruto.most_common():
        if n not in CANON: desconocidos.append(n); continue
        nom, fab, est, alt = CANON[n]
        if nom in terceros: terceros[nom]["c"] += c
        else: terceros[nom] = {"n": nom, "f": fab, "c": c, "e": est, "a": alt}

    serie = collections.Counter()
    for tag, nom in UI.items():
        n = len(re.findall(r'<%s[ >]' % re.escape(tag), s))
        if n: serie[nom] += n
    n_terceros = len(re.findall(r'<PluginDevice[ >]', s)) + len(re.findall(r'<AuPluginDevice[ >]', s))
    n_serie = sum(serie.values())

    return {
      "version": ver.group(1) if ver else None,
      "pistas": str(pistas), "grupos": str(raiz),
      "plugins": {
        "pct": round(100 * n_serie / max(1, n_serie + n_terceros)),
        "serie": [{"n": n, "c": c} for n, c in serie.most_common()],
        "terceros": sorted(terceros.values(), key=lambda x: -x["c"]),
      }
    }, desconocidos

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("uso: analizar-als.py <id-del-proyecto> <ruta al .als>")
    pid, ruta = sys.argv[1], sys.argv[2]
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    cj = os.path.join(raiz, "contenido.json")
    d = json.load(open(cj, encoding="utf-8"), object_pairs_hook=collections.OrderedDict)

    datos, desc = analizar(ruta)
    for p in d["proyectos"]:
        if p["id"] == pid:
            p["pistas"], p["grupos"] = datos["pistas"], datos["grupos"]
            p["plugins"] = datos["plugins"]
            break
    else:
        sys.exit("No existe el proyecto '%s' en contenido.json" % pid)

    json.dump(d, open(cj, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("%s · Live %s · %s pistas en %s bloques · %d%% de serie · %d plugins"
          % (pid, datos["version"], datos["pistas"], datos["grupos"],
             datos["plugins"]["pct"], len(datos["plugins"]["terceros"])))
    if desc:
        print("  ojo, sin traducir (añádelos a CANON):", ", ".join(desc))
