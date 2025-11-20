import { cloneElement, type JSX } from 'react';

import {
  faCss3Alt,
  faGitAlt,
  faGithub,
  faHtml5,
  faNodeJs,
  faPhp,
  faReact,
  faSwift,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card } from '../layout/Card';
import { Heading } from '../typography/Heading';
import {
  GraphQLIcon,
  JestIcon,
  KotlinIcon,
  NextJSIcon,
  TailwindIcon,
  TypeScriptIcon,
} from '../typography/icons/CustomIcons';

type SkillItemProps = {
  name: string;
  icon: JSX.Element | (() => JSX.Element);
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
    icon: () => (
      <FontAwesomeIcon icon={faReact} color="#149eca" fontSize="3.334em" />
    ),
    href: 'https://react.dev',
  },
  {
    name: 'React Native',
    icon: () => (
      <FontAwesomeIcon icon={faReact} color="#61DAFB" fontSize="3.334em" />
    ),
    href: 'https://reactnative.dev',
  },
  {
    name: 'Swift',
    icon: () => (
      <FontAwesomeIcon icon={faSwift} color="#F05138" fontSize="3.334em" />
    ),
    href: 'https://swift.org',
  },
  {
    name: 'Kotlin',
    icon: KotlinIcon,
    href: 'https://kotlinlang.org',
  },
  {
    name: 'PHP',
    icon: () => (
      <FontAwesomeIcon icon={faPhp} color="#aeb2d5" fontSize="3.334em" />
    ),
    href: 'https://www.php.net',
  },
  {
    name: 'Node.js',
    icon: () => (
      <FontAwesomeIcon icon={faNodeJs} color="#83CD29" fontSize="3.334em" />
    ),
    href: 'https://nodejs.org',
  },
  {
    name: 'GraphQL',
    icon: GraphQLIcon,
    href: 'https://graphql.org',
  },
  {
    name: 'HTML',
    icon: () => (
      <FontAwesomeIcon icon={faHtml5} color="#E44D26" fontSize="3.334em" />
    ),
    href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
  {
    name: 'CSS',
    icon: () => (
      <FontAwesomeIcon icon={faCss3Alt} color="#33A9DC" fontSize="3.334em" />
    ),
    href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
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
    name: 'Jest',
    icon: JestIcon,
    href: 'https://jestjs.io',
  },
  {
    name: 'Git',
    icon: () => (
      <FontAwesomeIcon icon={faGitAlt} color="#F34F29" fontSize="3.334em" />
    ),
    href: 'https://git-scm.com',
  },
  {
    name: 'GitHub',
    icon: () => <FontAwesomeIcon icon={faGithub} fontSize="3.334em" />,
    href: 'https://github.com',
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
          {typeof icon === 'function'
            ? icon()
            : cloneElement(icon, {
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
