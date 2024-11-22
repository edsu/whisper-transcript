import { html, css, LitElement } from 'lit';

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
    }
  `;

  static properties = {
    url: {type: String},
    audio: {type: String},
    transcript: {type: Object, attribute: false},
    time: {type: Number}
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
    if (! this.transcript) {
      return html`Loading...`;
    }

    return html`
      <whisper-audio url="audio.mp3"></whisper-audio>
      <ul>
        ${this.transcript.segments.map(s =>
          html`<whisper-segment .words="${s.words}" start="${s.start}" end="${s.end}" text="${s.text}" />`
        )}
      </ul>
    `;
  }
}