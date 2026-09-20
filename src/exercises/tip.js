import { h } from '../ui/dom.js';
export default {
  type: 'tip', card: true,
  render(ex) { return h`<h2 class="qtitle">💡 Tipp</h2><div class="tipcard"><div class="mid">${ex.title}</div><div class="tiptext">${ex.text}</div></div>`; },
  autoSpeak() { return null; }
};
