# Kama V2 — flagship site (Hima)

Static site for Hima by Kama Properties. Plain HTML, CSS and JavaScript, no build step.

## Pages
8 pages: `index`, `about`, `projects`, `contact`, each with an Arabic mirror (`-ar.html`).

Shared shell on every page: preloader (homepage only, once per session), fullscreen overlay menu, language toggle, statement footer.

## Hero scene player (`js/cinema.js`)
The hero is a coded scene player. Each `<div class="scene">` inside `.cinema` holds an image that pans on a GPU transform (`data-move="in|out"`) while scenes crossfade on a fixed interval. `data-dusk="true"` switches the stage to its dusk palette and enables the warm-particle atmosphere layer. The progress segments are clickable and jump to a scene. Reduced-motion users get the first scene, static.

Any scene can carry real footage. Add a video inside the scene, keeping the image as the fallback:

```html
<div class="scene" data-move="in" data-dusk="false">
  <img src="assets/still.jpg" alt="">
  <video autoplay muted loop playsinline><source src="assets/FILE.mp4" type="video/mp4"></video>
</div>
```

The player tags the scene `has-video`, which hides the still and disables the pan animation for that scene.

## Forms
Interest forms (`index.html`, `index-ar.html`) post to FormSubmit, delivering to info@kamaproperties.net.
