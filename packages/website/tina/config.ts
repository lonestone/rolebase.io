import { defineConfig } from 'tinacms'

const videoTemplates = [
  {
    name: 'TellaVideo',
    label: 'Tella Video',
    fields: [
      { name: 'videoId', label: 'Video ID', type: 'string' as const, required: true },
      { name: 'class', label: 'CSS Class', type: 'string' as const },
    ],
  },
  {
    name: 'LoomVideo',
    label: 'Loom Video',
    fields: [
      { name: 'loomId', label: 'Loom ID', type: 'string' as const, required: true },
      { name: 'class', label: 'CSS Class', type: 'string' as const },
    ],
  },
  {
    name: 'Youtube',
    label: 'YouTube Video',
    fields: [
      { name: 'videoId', label: 'Video ID', type: 'string' as const, required: true },
      { name: 'class', label: 'CSS Class', type: 'string' as const },
    ],
  },
]

export default defineConfig({
  branch: '',
  clientId: '',
  token: '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'summary',
            label: 'Summary',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Publish Date',
          },
          {
            type: 'datetime',
            name: 'update',
            label: 'Updated Date',
          },
          {
            type: 'string',
            name: 'lang',
            label: 'Language',
            required: true,
            options: ['en', 'fr'],
          },
          {
            type: 'string',
            name: 'image',
            label: 'Cover Image Path',
          },
          {
            type: 'string',
            name: 'author',
            label: 'Author',
          },
          {
            type: 'string',
            name: 'similarPosts',
            label: 'Similar Posts',
            list: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Content',
            isBody: true,
            templates: videoTemplates,
          },
        ],
      },
      {
        name: 'clientCases',
        label: 'Client Cases',
        path: 'src/content/client-cases',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'summary',
            label: 'Summary',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'lang',
            label: 'Language',
            required: true,
            options: ['en', 'fr'],
          },
          {
            type: 'string',
            name: 'sector',
            label: 'Sector',
          },
          {
            type: 'string',
            name: 'teamSize',
            label: 'Team Size',
          },
          {
            type: 'string',
            name: 'logo',
            label: 'Logo Path',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Content',
            isBody: true,
            templates: videoTemplates,
          },
        ],
      },
    ],
  },
})
