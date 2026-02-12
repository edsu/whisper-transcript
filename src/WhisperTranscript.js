import { html, css, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export class WhisperTranscript extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--whisper-transcript-text-color, #000);
    }

    ul {
      list-style: none;
      padding-left: 0;
      overflow-y: auto;
    }

    .media {
      text-align: center;
    }

    .whisper-transcript {
      background: black;
      color: white;
    }
  `;

  static properties = {
    url: {type: String},
    audio: {type: String},
    video: {type: String},
    transcript: {type: Object, attribute: false},
    time: {type: Number},
    maxHeight: {type: String}
  };

  constructor() {
    super();
    this.time = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.getTranscript();

    const that = this;
    window.addEventListener('update-time', e => that.time = e.detail.time);
  }

  async getTranscript() {
    const resp = await fetch(this.url);
    this.transcript = await resp.json();
  }

  render() {
    const styles = {
      maxHeight: this.maxHeight
    }

    if (! this.transcript) {
      return html`Loading...`;
    }

    let media = null;
    if (this.audio) {
      media = html`<whisper-media audio="${this.audio}"></whisper-media>`;
    } else {
      media = html`<whisper-media video="${this.video}"></whisper-media>`;
    }

    return html`
      <div class="whisper-transcript">
        <div class="media">
          ${media}
        </div>
        <ul style="${styleMap(styles)}">
          ${this.transcript.segments.map(s =>
            html`<whisper-segment .words="${s.words}" start="${s.start}" end="${s.end}" text="${s.text}" />`
          )}
        </ul>
      </div>
    `;
  }
}
