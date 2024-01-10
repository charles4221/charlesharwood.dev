# charlesharwood.dev :australia:

My name is Charles Harwood and I'm a software engineer from the Gold Coast, Australia. I've been working in the tech industry since 2011, and I've been writing crappy code since MySpace was cool.

I'm currently working at [Entain Australia & New Zealand][entain] as a Staff Engineer, working under the Head of Engineering across all product delivery and engineering teams. My focus is on improving the performance and stability of our apps, the quality of our codebases, and helping our teams deliver great experiences to Entain customers.

My technical focus since 2021 has been [React Native][react-native] with [TypeScript][typescript], but I've been working with [React][react] in general since 2015 (the days of `React.createClass`, what a time to be alive).

## Why this repo exists

This is the source code for my personal website, [charlesharwood.dev][the-site]

After many years of thinking I needed to keep my own website's source code a secret, I've finally realised that _nobody cares_, so I've decided to open source it. I've been inspired by the many open source projects I've used and contributed to over the years, and I want to give back to the community wherever I can.

If my crappy code can help someone else, then I'm happy to share it.

This website was built using everyone and their grandma's favourite tools and libraries:

- [Visual Studio Code][vscode] (the GOAT IDE you can't change my mind)
- [TypeScript][typescript] because `typescript > javascript && typescript === javascript`
- [Prismic][prismic] for my CMS, with their incredible [Slice Machine][slicemachine] feature
- [Next.js][nextjs] for the core framework (and therefore obviously [React][react])
- [Tailwind CSS][tailwind] utility-first CSS framework for styling
- [Zustand][zustand] for client state management
- [Font Awesome Pro][fontawesome] v6 for icons
- [clsx][clsx] for constructing `className` strings conditionally
- [ESLint][eslint] with [eslint-plugin-unicorn][eslint-unicorn] for linting
- [Prettier][prettier] for code formatting
- [PostCSS][postcss] with [Autoprefixer][autoprefixer] for CSS processing

## Why I used these technologies

As mentioned above, this website is built using [Prismic][prismic] as a headless CMS, and [Next.js][nextjs] as the core framework. It uses [Slice Machine][slicemachine] to build reusable components that can be used to build pages in Prismic.

I have built multiple sites (including my old site) using Prismic and Next, however this is the first time I've used Slice Machine. The way it syncs the reusable React components you create with the schema you create in Slice Machine, and then allows you to use those components to build pages in the Prismic CMS itself, all with full built-in TypeScript typing, is incredible. It's a huge time saver, and I'm a big fan.

This is also the first time I've used Tailwind CSS, and I'm enjoying it so far. I've been a big fan of writing only my own custom CSS (usually with SCSS/Sass) for many years, but Tailwind was recently chosen as the CSS framework for a web project at work, so I decided to use it for my own site as a bit of a learning experience, and I'm glad I did.

Last but definitely not least, we have Zustand for client-side state management. I have used React Context almost exclusively on personal projects, and I'm forced at gunpoint to use Redux at work (I'm kidding, I love my job), but I've been hearing a lot of good things about Zustand, so I decided to give it a go, and it is _awesome_. It's so simple to use, and it's so fast. Thanks to my man [Rhys Geary][rhysgeary] for the recommendation :fire:

(NB: shoutout also to [Tanstack Query][tanstack] which is incredibly sweet for managing server state across larger apps; I haven't used it here as the site doesn't have any client-side data fetching requirements thanks to Next.js and React Server Components, but I still wanted to mention it because of how damn good it has been in my experience using it in a React Native codebase with thousands of components.)

## 🚀 Quick Start

Since I've done all the manual configuration stuff a million times before, this time around I decided I don't need to prove anything to anyone, so why not just use a starter template to take care of all that initial stuff that nobody wants to do? Especially now that I'm a father of two boys, I have a lot less free time and thus I need less reasons to procrastinate on actually building the damn site.

Thankfully since I last used Prismic to build a new site from scratch, they've introduced some great templates to get you started with various framework integrations. I used the [Prismic Next.js Multi-Page Website Starter][starter-docs] as a base, and then added all my own customisations on top of that. It's a great starter, and I highly recommend it for anyone wanting to build a Next.js site with Prismic.

- **Learn more about using Prismic with Next.js**: [Prismic Next.js Documentation][prismic-docs]

To start a new project using this starter, run the following commands in your terminal:

```sh
npx degit prismicio-community/nextjs-starter-prismic-multi-page your-project-name
cd your-project-name
npx @slicemachine/init@latest
```

The commands will do the following:

1. Start a new Next.js project using this starter.
2. Ask you to log in to Prismic or [create an account][prismic-sign-up].
3. Create a new Prismic content repository with sample content.

When you're ready to start your project, run the following command:

```sh
npm run dev
```

### Starter Documentation

To learn how to work with your new project, [**see this starter's docs**][starter-docs].

To learn more about working with Prismic, [**see the Prismic docs**][prismic-docs].

## License

```
Copyright 2015-2024 Charles Harwood <charles@harwood.digital> (https://charlesharwood.dev)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[entain]: https://entaingroup.com.au/
[typescript]: https://www.typescriptlang.org/
[react]: https://react.dev/
[react-native]: https://reactnative.dev/
[prismic]: https://prismic.io/
[slicemachine]: https://prismic.io/slice-machine
[prismic-docs]: https://prismic.io/docs/technologies/nextjs
[prismic-sign-up]: https://prismic.io/dashboard/signup
[nextjs]: https://nextjs.org/
[starter-docs]: https://github.com/prismicio-community/nextjs-starter-prismic-multi-page
[the-site]: https://charlesharwood.dev/
[vscode]: https://code.visualstudio.com/
[tailwind]: https://tailwindcss.com/
[zustand]: https://zustand-demo.pmnd.rs/
[clsx]: https://github.com/lukeed/clsx
[fontawesome]: https://fontawesome.com/
[eslint]: https://eslint.org/
[eslint-unicorn]: https://github.com/sindresorhus/eslint-plugin-unicorn
[prettier]: https://prettier.io/
[postcss]: https://postcss.org/
[autoprefixer]: https://autoprefixer.github.io/
[tanstack]: https://tanstack.com/query/latest
[rhysgeary]: https://github.com/RhyG
