import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const ensayos = await getCollection('ensayos');

  return rss({
    title: 'CineIndustria — Ensayos',
    description: 'Laboratorio editorial para repensar la imagen, el cine y el archivo en la era de la IA desde Latinoamérica.',
    site: context.site!.toString(),
    items: ensayos.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      link: `/ensayos/${entry.id}/`,
      pubDate: new Date(`${entry.data.year}-01-01`),
    })),
    customData: '<language>es-CL</language>',
  });
}
