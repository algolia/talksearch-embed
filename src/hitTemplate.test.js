/* eslint-disable import/no-commonjs */
import module from './hitTemplate.js';
import helper from './test-helper.js';

describe('hitTemplate', () => {
  describe('highlight', () => {
    it('should get the highlighted key', () => {
      const input = {
        _highlightResult: {
          foo: {
            value: 'bar',
          },
        },
      };

      const actual = module.internals.highlight(input, 'foo');

      expect(actual).toEqual('bar');
    });
    it('should default to the regular key if no highlight available', () => {
      const input = {
        foo: 'bar',
        _highlightResult: {
          notfoo: {
            value: 'baz',
          },
        },
      };

      const actual = module.internals.highlight(input, 'foo');

      expect(actual).toEqual('bar');
    });
  });

  describe('formatNumber', () => {
    it('should return the exact number if less than 1000', () => {
      const input = 123;

      const actual = module.internals.formatNumber(input);

      expect(actual).toEqual('123');
    });

    it('should return a rounded k-suffixed number if more than 1000', () => {
      const input = 1230;

      const actual = module.internals.formatNumber(input);

      expect(actual).toEqual('1k');
    });
  });

  describe('renderViews', () => {
    it('should return an element with 1k views', () => {
      const input = {
        video: {
          popularity: {
            views: 1234,
          },
        },
      };
      helper.mockPrivate(module, 'formatNumber', '1k');

      const actual = module.internals.renderViews(input);

      expect(actual).toMatchSnapshot();
    });
  });

  describe('getThumbnail', () => {
    it('should return the highest quality thumbnail', () => {
      const input = {
        video: {
          thumbnails: {
            high: {
              url: 'foo',
            },
          },
        },
      };

      const actual = module.internals.getThumbnail(input);

      expect(actual).toEqual('foo');
    });
  });

  describe('renderCaption', () => {
    it('should not render anything if there is no match in the caption', () => {
      const input = {
        _snippetResult: {
          caption: {
            content: {
              matchLevel: 'none',
            },
          },
        },
      };

      const actual = module.internals.renderCaption(input);

      expect(actual).toEqual('');
    });

    it('should not render anything if there is no snippeting', () => {
      const input = {};

      const actual = module.internals.renderCaption(input);

      expect(actual).toEqual('');
    });

    it('should render a caption with the thumbnail as background', () => {
      const input = {
        _snippetResult: {
          caption: {
            content: {
              matchLevel: 'full',
              value: 'my_caption',
            },
          },
        },
      };
      helper.mockPrivate(module, 'getThumbnail', 'my_url');

      const actual = module.internals.renderCaption(input);

      expect(actual).toMatchSnapshot();
    });
  });

  describe('renderSpeakers', () => {
    it('should return an empty string if no speakers', () => {
      const input = {};

      const actual = module.internals.renderSpeakers(input);

      expect(actual).toEqual('');
    });

    it('should render only one speaker', () => {
      const input = {
        speakers: [{ name: 'foo' }],
      };

      const actual = module.internals.renderSpeakers(input);

      expect(actual).toMatchSnapshot();
    });

    it('should render several speakers', () => {
      const input = {
        speakers: [{ name: 'foo' }, { name: 'bar' }],
      };

      const actual = module.internals.renderSpeakers(input);

      expect(actual).toMatchSnapshot();
    });
  });

  describe('renderConferenceYear', () => {
    it('should render the year in an element', () => {
      const input = { conference: { year: 2018 } };

      const actual = module.internals.renderConferenceYear(input);

      expect(actual).toMatchSnapshot();
    });

    it('should render an empty string if no year found', () => {
      const input = {};

      const actual = module.internals.renderConferenceYear(input);

      expect(actual).toEqual('');
    });
  });

  describe('renderVideoSubtitle', () => {
    it('should only render the speaker if no year', () => {
      helper.mockPrivate(module, 'renderSpeakers', 'Tim Carry');
      helper.mockPrivate(module, 'renderConferenceYear', '');

      const actual = module.internals.renderVideoSubtitle();

      expect(actual).toMatchSnapshot();
    });

    it('should only render the year if no speakers', () => {
      helper.mockPrivate(module, 'renderSpeakers', '');
      helper.mockPrivate(module, 'renderConferenceYear', '2018');

      const actual = module.internals.renderVideoSubtitle();

      expect(actual).toMatchSnapshot();
    });
    it('should render both speakers and year', () => {
      helper.mockPrivate(module, 'renderSpeakers', 'Tim Carry');
      helper.mockPrivate(module, 'renderConferenceYear', '2018');

      const actual = module.internals.renderVideoSubtitle();

      expect(actual).toMatchSnapshot();
    });
  });
});
