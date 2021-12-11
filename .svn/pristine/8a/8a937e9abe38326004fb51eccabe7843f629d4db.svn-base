export default {
  props: {
    selected: String,
  },
  data(){
    return {
      areas: undefined,
      rect: undefined,
      timer: 0,
    }
  },
  mounted(){
    const dom = this.$refs.map;
    if(dom){
      this.areas = dom.getElementsByTagName('g');
      this.rect = this.parserRect(dom.getAttribute('viewBox'));
      this.$nextTick(() => {
        for(let area of this.areas){
          const adcode = area.getAttribute('adcode'), 
            title = area.getAttribute('title'),
            offset = area.getAttribute('title-offset');
          const context = {adcode, title, elem: area};
          this.addEvent('click', context);
          this.addEvent('dblclick', context);
          if('infinity' != offset){
            this.addText(dom, area.getBBox(), title, offset);
          }
          if(this.selected == adcode){
            area.classList.add('selected');
          }
        }
      })
    }
  },
  watch: {
    selected(v){
      if(this.areas){
        for(let area of this.areas){
          const adcode = area.getAttribute('adcode');
          if(adcode == v){
            area.classList.add('selected');
          }else{
            area.classList.remove('selected');
          }
        }
      }
    }
  },
  methods: {
    addEvent(type, context){
      context.elem.addEventListener(type, (e) => {
        clearTimeout(this.timer);
        if(type == 'click'){
          this.timer = setTimeout(() => {
            this.$emit('select', {...context, event: e});
          }, 200);
        }else if(type == 'dblclick'){
          this.$emit('enter', {...context, event: e});
        }
      });
    },
    addText(svg, rect, text, offset){
      if(!text){
        return;
      }
      const fontSize = Math.max(this.rect.width, this.rect.height)/600 * 18, spacing = 1;
      let offsetX = 0, offsetY = 0;
      if(offset){
        let offsetArr = offset.split(' ');
        offsetX = Number(offsetArr[0]) || 0;
        offsetY = Number(offsetArr[1]) || 0;
      }
      let t = svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute("x", rect.x + rect.width/2 - (fontSize + spacing) * text.length / 2 + offsetX);
      t.setAttribute("y", rect.y + rect.height/2 + fontSize / 2 + offsetY);
      t.setAttribute("font-size", fontSize);
      t.setAttribute("letter-spacing", spacing);
      t.setAttribute("font-weight", "bold");
      t.setAttribute('fill', '#FFF');
      t.setAttribute('pointer-events', 'none');
      // t.setAttribute('user-select', 'none');
      t.innerHTML = text;
      svg.appendChild(t);
    },
    parserRect(str){
      const arr = str.split(' ');
      const x = Number(arr[0]) || 0, y = Number(arr[1]) || 0, 
        width = Number(arr[2]) || 0, height = Number(arr[3]) || 0;
      return {
        x, y, width, height
      }
    }
  }
}