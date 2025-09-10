/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */


// TODO: convert to vanilla and replace classnames
document.addEventListener("DOMContentLoaded", ()=> {
  if(window?.ScrollTrigger && window?.gsap){
    

    function addParallax(block, item, img){
      const tl = window.gsap.timeline({
        scrollTrigger: {
          start: "top bottom",
          end: "bottom top",
          trigger: item,
          scrub: true,
          //markers: true
        },
        ease: "none"
      })
        .fromTo(img, {y: () => (Number(item.getAttribute('data-plax')) / 2) * -1}, {y: () => (Number(item.getAttribute('data-plax')) / 2)})
        .paused(true)
    }


    const plaxBlocks = document.querySelectorAll('.scrapblok-composer')

    plaxBlocks.forEach(block => {
      const items = block.querySelectorAll('[data-plax]')

      items.forEach(item => {
        const image = item.querySelector('img')
        addParallax(block, item, image)
      })
    })


  }
})
