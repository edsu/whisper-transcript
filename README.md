# \<whisper-transcript>

This web-component lets you view the JSON output of [Whisper](https://github.com/openai/whisper) to graphically examine the probability of each word. You will want to run whisper with the `--word_stamps` turned on:

```
$ whisper --model large-v3 --word_timestamps True media.mp3
```

You can see a demo at https://edsu.github.io/whisper-transcript

## Installation

```bash
yarn install whisper-transcript
```

## Usage

```html
<script type="module">
  import 'whisper-transcript/whisper-transcript.js';
</script>

<whisper-transcript audio="media.mp3" url="media.json"></whisper-transcript>
```

If you have a video file that will play natively in the browser you can use the `video` attribute:

```html
<whisper-transcript video="media.mp4" url="media.json"></whisper-transcript>
```

## Develop

You will want to clone this repository and then:

```bash
yarn install
yarn start
```

This will open the page in the `demo` directory. If you like you can swap out the `audio.mp3` and `audio.json` files for ones you've created to see what a transcript you've generated looks like.
