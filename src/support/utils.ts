const genreIdByName: any = {
  'horror': 1,
  'thriller': 2,
  'action': 3,
  'romance': 4,
  'drama': 5,
  'family': 6,
  'comedy': 7,
  'crime': 8,
  'sci-fi': 14,
  'fantasy': 17
};

export function getGenreIdByName(genreName: string): number {
  genreName = genreName && genreName.toLowerCase();
  return genreIdByName[genreName];
}

export function getRange(movies: any) {
  const count = movies.count;
  const length = movies.items.length;

  if (count === 0 || (count > length)) {
    const from = length;
    const to = !count || (count - from > 10) ? length + 9 : count - 1;
    return { from, to };
  }
}

export function getMetaInfo(params: {
  url: string,
  title: string,
  description: string,
  keywords: string[],
  image: string,
  ldJSON: object
}) {
  const { url, title, description, keywords, image, ldJSON } = params;

  return {
    htmlAttrs: {
      lang: 'en',
      amp: true
    },
    link: [
      { rel: 'canonical', href: url }
    ],
    meta: [
      {name: 'description', content: description },
      {name: 'keywords', content: keywords.filter(Boolean).join(', ') },
      // OpenGraph data (Most widely used)
      {property: 'og:title', content: title},
      {property: 'og:site_name', content: 'statbox.in'},
      // The list of types is available here: http://ogp.me/#types
      {property: 'og:type', content: 'website'},
      // Should the the same as your canonical link, see below.
      {property: 'og:url', content: url},
      {property: 'og:image', content: image},
      // Often the same as your meta description, but not always.
      {property: 'og:description', content: description},

      // Twitter card
      {name: 'twitter:card', content: 'summary'},
      {name: 'twitter:site', content: url},
      {name: 'twitter:title', content: title},
      {name: 'twitter:description', content: description},
      // Your twitter handle, if you have one.
      // {name: 'twitter:creator', content: '@alligatorio'},
      {name: 'twitter:image:src', content: image},

      // Google / Schema.org markup:
      {itemprop: 'name', content: title},
      {itemprop: 'description', content: description},
      {itemprop: 'image', content: image}
    ],
    script: [{
      vmid: 'ldjson-schema',
      innerHTML: JSON.stringify(ldJSON),
      type: 'application/ld+json'
    }],
    __dangerouslyDisableSanitizersByTagID: {
      'ldjson-schema': ['innerHTML']
    }
  };
}
