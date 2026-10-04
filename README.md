# Functional Ear Training

A browser-based ear-training app built around Alain Benbassat's functional ear training method. It works offline and can be added to an iPhone home screen like a native app.

**Live app:** https://curarda.github.io/functional-ear-training/

## Who it is for

- Singers and instrumentalists who want to hear harmonic function (tonic, subdominant, dominant) instead of memorizing note names.
- Music theory students following the functional method.

## Why I built it

I wanted a free, offline practice tool I could use on my phone anywhere, without an account, ads or internet access.

## What it does

- Sets the tonic with a cadence, then plays a note or chord for you to identify by degree.
- Theory view: shows the notes of the tonic and the diatonic chord sequence, written with the actual note names of the chosen key.
- Adjustable volume; sound plays on iPhone even with the silent switch on.
- Works offline through a service worker.

## Install on iPhone

1. Open the live link in **Safari** (Chrome does not support home screen apps on iOS).
2. Tap Share → **Add to Home Screen**.

## Run locally

Open `index.html` in a browser, or serve the folder with any static file server.

## Tech

HTML, CSS and JavaScript, Web Audio API, Web App Manifest, service worker.

The original Turkish documentation is in [README.tr.md](README.tr.md).
