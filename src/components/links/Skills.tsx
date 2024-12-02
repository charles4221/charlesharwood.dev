import { cloneElement, type JSX } from 'react';

import { Card } from '../layout/Card';
import { Heading } from '../typography/Heading';
import {
  CSSIcon,
  GitHubIcon,
  GitIcon,
  GraphQLIcon,
  HTMLIcon,
  JIRAIcon,
  JestIcon,
  KotlinIcon,
  MetroIcon,
  NextJSIcon,
  NodeJSIcon,
  PHPIcon,
  ReactIcon,
  ReactNativeIcon,
  StorybookIcon,
  SwiftIcon,
  TailwindIcon,
  TanstackIcon,
  TypeScriptIcon,
  WebpackIcon,
} from '../typography/icons/CustomIcons';

type SkillItemProps = {
  name: string;
  icon: JSX.Element;
  href: string;
};

export const SKILLS: SkillItemProps[] = [
  {
    name: 'TypeScript',
    icon: TypeScriptIcon,
    href: 'https://www.typescriptlang.org',
  },
  {
    name: 'React',
    icon: ReactIcon,
    href: 'https://react.dev',
  },
  {
    name: 'React Native',
    icon: ReactNativeIcon,
    href: 'https://reactnative.dev',
  },
  {
    name: 'Swift',
    icon: SwiftIcon,
    href: 'https://swift.org',
  },
  {
    name: 'Kotlin',
    icon: KotlinIcon,
    href: 'https://kotlinlang.org',
  },
  {
    name: 'PHP',
    icon: PHPIcon,
    href: 'https://www.php.net',
  },
  {
    name: 'Node.js',
    icon: NodeJSIcon,
    href: 'https://nodejs.org',
  },
  {
    name: 'GraphQL',
    icon: GraphQLIcon,
    href: 'https://graphql.org',
  },
  {
    name: 'HTML',
    icon: HTMLIcon,
    href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
  {
    name: 'CSS',
    icon: CSSIcon,
    href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  },
  {
    name: 'Tanstack Query',
    icon: TanstackIcon,
    href: 'https://tanstack.com/query/latest',
  },
  {
    name: 'Next.js',
    icon: NextJSIcon,
    href: 'https://nextjs.org',
  },
  {
    name: 'Tailwind',
    icon: TailwindIcon,
    href: 'https://tailwindcss.com',
  },
  {
    name: 'Storybook',
    icon: StorybookIcon,
    href: 'https://storybook.js.org',
  },
  {
    name: 'Jest',
    icon: JestIcon,
    href: 'https://jestjs.io',
  },
  {
    name: 'Metro',
    icon: MetroIcon,
    href: 'https://metrobundler.dev',
  },
  {
    name: 'Webpack',
    icon: WebpackIcon,
    href: 'https://webpack.js.org',
  },
  {
    name: 'Git',
    icon: GitIcon,
    href: 'https://git-scm.com',
  },
  {
    name: 'GitHub',
    icon: GitHubIcon,
    href: 'https://github.com',
  },
  {
    name: 'JIRA',
    icon: JIRAIcon,
    href: 'https://www.atlassian.com/software/jira',
  },
];

function SkillItem({ name, icon, href }: SkillItemProps) {
  return (
    <li className="text-xs">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group">
        <Card isCentered isLink>
          {cloneElement(icon, {
            className: 'size-10',
          })}
        </Card>
        <p className="mt-3">{name}</p>
      </a>
    </li>
  );
}

function renderSkillItem(skill: SkillItemProps) {
  return <SkillItem key={skill.name} {...skill} />;
}

export function Skills() {
  return (
    <section className="text-center my-10">
      <Heading as="h2" size="md" className="mb-6">
        Skills
      </Heading>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-3">
        {SKILLS.map(renderSkillItem)}
      </ul>
    </section>
  );
}
