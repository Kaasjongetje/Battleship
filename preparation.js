export function onTileEnter () {

}



export function onShipDrag (e) {
    const target = e.target
  
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy
  
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }