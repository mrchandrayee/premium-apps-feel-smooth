# Why Premium Apps Feel Smooth — Six Details

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://mrchandrayee.github.io/premium-apps-feel-smooth/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org) [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

A runnable recreation of the uploaded 56.03-second, 720×1280, 30fps motion-design video.

## Video content transcribed

Opening: **“Why premium apps feel smooth.”** The video presents six motion details, shown in slow motion.

1. **01 · BUTTON PRESS — “Sink, then spring.”**
   - Button scale compresses to 95%, then springs back.
   - Displayed metric: `SCALE 95% · SPRINGS BACK`
   - Graph label: `SCALE`; duration: `TIME · 800 ms`.

2. **02 · PULL TO REFRESH — “Resist the pull.”**
   - Finger movement is 100%; list movement is 35%.
   - Displayed metric: `FINGER 100% → LIST 35%`.
   - Graph label: `LIST`.

3. **03 · ROLLING NUMBER — “Roll, don't jump.”**
   - Digits roll into place 100ms apart.
   - Displayed metric: `DIGITS ROLL · 100 ms APART`.
   - Graph label: `DIGIT POSITION`; duration: `TIME · 800 ms`.

4. **04 · DRAG TO REORDER — “Lift, then make room.”**
   - Lifted item scales to 105%; other items slide over 200ms.
   - Displayed metric: `LIFT 105% · OTHERS SLIDE 200 ms`.
   - Graph label: `LIFT`; duration: `TIME · 1200 ms`.

5. **05 · CARD EXPAND — “Fast, then slow.”**
   - Ease-out expansion.
   - Displayed metric: `EASE-OUT · 350 ms`.
   - Graph label: `SIZE`; duration shown: `TIME · 533 ms`.

6. **06 · SUCCESS — “Draw the win.”**
   - Circle draws, then tick appears.
   - Displayed metric: `CIRCLE, THEN TICK · 470 ms`.
   - Graph label: `TICK DRAWN`; duration: `TIME · 600 ms`.

The video labels each demo **SLOW-MO ¼×** and ends with the six-detail motion study.

## Interactions implemented
- Button press: click/press to compress and spring back.
- Pull-to-refresh: pull the list down (touch or pointer) to trigger a refresh state. Resistance scales list travel to 35% of finger travel.
- Rolling number: click the total to switch between $486 and $529; digits animate 100ms apart.
- Drag to reorder: drag the three task rows to change their order.
- Card expand: click/tap the Lisbon nights card to expand and collapse.
- Success: click the success circle to replay the ring-then-tick sequence.

## Run locally
No packages or build step required:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000.

## Project structure
- `index.html` — layout
- `styles.css` — dark interface, demo components, easing and animation
- `app.js` — six demo states and interactions
- `README.md` — transcription and run instructions

## Source accuracy
The recording is a motion-design explainer, not a source-code tutorial. The six labels, headings, on-screen measurements and explanations are transcribed from the video. This runnable project recreates the demonstrations in new HTML, CSS and JavaScript; it is not the original creator's hidden source code. Some supporting chart paths are illustrative approximations of the curves visible in the video.

## 👨‍💻 Author

**mrchandrayee** · [GitHub](https://github.com/mrchandrayee)

## 📄 License

[MIT License](./LICENSE)
