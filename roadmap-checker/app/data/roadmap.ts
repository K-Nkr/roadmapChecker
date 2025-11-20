export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  requiredOutput: boolean;
  dependencies: string[];
  category: 'Basic' | 'Framework' | 'Tooling' | 'Language';
}

export const INITIAL_ROADMAP: RoadmapItem[] = [
  {
    id: 'html-css',
    title: 'HTML & CSS',
    description: 'Webページの構造とスタイルを定義する基礎技術。セマンティックなマークアップとレスポンシブデザインを学びます。',
    requiredOutput: true,
    dependencies: [],
    category: 'Basic',
  },
  {
    id: 'git',
    title: 'Git & GitHub',
    description: 'バージョン管理システム。コードの変更履歴を記録し、チーム開発の基礎を身につけます。',
    requiredOutput: false,
    dependencies: ['html-css'],
    category: 'Tooling',
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Webページに動的な機能を追加するプログラミング言語。DOM操作、非同期処理（Fetch API）などを学びます。',
    requiredOutput: true,
    dependencies: ['html-css'],
    category: 'Language',
  },
  {
    id: 'react',
    title: 'React',
    description: 'ユーザーインターフェースを構築するためのJavaScriptライブラリ。コンポーネント指向、State管理を学びます。',
    requiredOutput: true,
    dependencies: ['javascript', 'git'],
    category: 'Framework',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'JavaScriptに静的型付けを加えたスーパーセット。大規模開発に必須の型安全性を学びます。',
    requiredOutput: false,
    dependencies: ['javascript'],
    category: 'Language',
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    description: 'Reactベースのフルスタックフレームワーク。SSR/SSG、ルーティング、APIルートなどを学びます。',
    requiredOutput: true,
    dependencies: ['react', 'typescript'],
    category: 'Framework',
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    description: 'ユーティリティファーストのCSSフレームワーク。迅速なスタイリングとデザインシステムの実装を学びます。',
    requiredOutput: false,
    dependencies: ['html-css'],
    category: 'Tooling',
  },
];
