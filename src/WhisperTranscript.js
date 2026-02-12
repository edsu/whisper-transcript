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
      position: sticky;
      top: 0;
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

    window.addEventListener('update-time', (e) => this.updateTime(e.detail.time));
  }

  async getTranscript() {
    const resp = await fetch(this.url);
    this.transcript = await resp.json();
  }

  updateTime(currentTime) {
    this.time = currentTime;
    this.requestUpdate();
    this.scrollToActiveSegment();
  }

  scrollToActiveSegment() {
    const activeSegment = this.shadowRoot.querySelector('.active');
    if (activeSegment) {
      activeSegment.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  render() {
    const styles = {
      maxHeight: this.maxHeight
    }

    if (! this.transcript) {
      return html`Loading...`;
    }

    const media = this.audio
      ? html`<whisper-media audio="${this.audio}"></whisper-media>`
      : html`<whisper-media video="${this.video}"></whisper-media>`;

    return html`
      <div class="whisper-transcript">
        <div class="media">${media}</div>
        <ul style="${styleMap(styles)}">
          ${this.transcript.segments.map(
            (s) => html`
              <whisper-segment class="${this.time >= s.start && this.time <= s.end ? 'active' : ''}" .words="${s.words}"
                 start="${s.start}" end="${s.end}" text="${s.text}" />
            `
          )}
        </ul>
      </div>
    `;
  }
}
