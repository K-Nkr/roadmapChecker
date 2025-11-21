export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  requiredOutput: boolean;
  dependencies: string[];
  category: 'Basic' | 'Framework' | 'Tooling' | 'Language' | 'Backend' | 'Database' | 'Testing' | 'DevOps';
  tutorials?: { title: string; url: string }[];
  children?: RoadmapItem[];
}

export const INITIAL_ROADMAP: RoadmapItem[] = [
  // Basic
  {
    id: 'html-css',
    title: 'HTML & CSS',
    description: 'Webページの構造とスタイルを定義する基礎技術。セマンティックなマークアップとレスポンシブデザインを学びます。',
    requiredOutput: true,
    dependencies: [],
    category: 'Basic',
    tutorials: [
      { title: 'MDN Web Docs - HTML', url: 'https://developer.mozilla.org/ja/docs/Web/HTML' },
      { title: 'MDN Web Docs - CSS', url: 'https://developer.mozilla.org/ja/docs/Web/CSS' },
      { title: 'W3C - HTML & CSS', url: 'https://www.w3.org/standards/webdesign/htmlcss' },
    ],
    children: [
      {
        id: 'semantic-html',
        title: 'Semantic HTML',
        description: '適切なタグ（header, main, footer, articleなど）を使用して、文書構造を意味的に記述します。',
        requiredOutput: false,
        dependencies: [],
        category: 'Basic',
      },
      {
        id: 'flexbox',
        title: 'Flexbox',
        description: '1次元のレイアウトモデル。要素の配置、整列、スペース配分を柔軟に行います。',
        requiredOutput: false,
        dependencies: ['semantic-html'],
        category: 'Basic',
      },
      {
        id: 'css-grid',
        title: 'CSS Grid',
        description: '2次元のレイアウトモデル。行と列を使用して複雑なレイアウトを構築します。',
        requiredOutput: false,
        dependencies: ['flexbox'],
        category: 'Basic',
      },
      {
        id: 'responsive-design',
        title: 'Responsive Design',
        description: 'メディアクエリを使用して、スマートフォンやタブレットなど異なる画面サイズに対応します。',
        requiredOutput: true,
        dependencies: ['css-grid'],
        category: 'Basic',
      },
    ],
  },
  // Language
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Webページに動的な機能を追加するプログラミング言語。DOM操作、非同期処理（Fetch API）などを学びます。',
    requiredOutput: true,
    dependencies: ['html-css'],
    category: 'Language',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'JavaScriptに静的型付けを加えたスーパーセット。大規模開発に必須の型安全性を学びます。',
    requiredOutput: false,
    dependencies: ['javascript'],
    category: 'Language',
  },
  // Tooling
  {
    id: 'git',
    title: 'Git & GitHub',
    description: 'バージョン管理システム。コードの変更履歴を記録し、チーム開発の基礎を身につけます。',
    requiredOutput: false,
    dependencies: ['html-css'],
    category: 'Tooling',
  },
  // Framework (Frontend)
  {
    id: 'react',
    title: 'React',
    description: 'ユーザーインターフェースを構築するためのJavaScriptライブラリ。コンポーネント指向、State管理を学びます。',
    requiredOutput: true,
    dependencies: ['javascript', 'git'],
    category: 'Framework',
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
  // Backend
  {
    id: 'nodejs',
    title: 'Node.js API',
    description: 'サーバーサイドJavaScriptランタイム。Next.jsのAPI RoutesまたはExpressを用いてREST API構築を学びます。',
    requiredOutput: true,
    dependencies: ['javascript'],
    category: 'Backend',
  },
  // Database
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: '堅牢なオープンソースのリレーショナルデータベース。SQLの基礎とデータモデリングを学びます。',
    requiredOutput: false,
    dependencies: ['nodejs'],
    category: 'Database',
  },
  {
    id: 'prisma',
    title: 'Prisma',
    description: '次世代ORM。型安全なデータベースアクセスとマイグレーション管理を学びます。',
    requiredOutput: true,
    dependencies: ['postgresql', 'typescript'],
    category: 'Database',
  },
  // Testing
  {
    id: 'jest',
    title: 'Jest / Vitest',
    description: 'JavaScriptテストフレームワーク。単体テストの書き方とTDD（テスト駆動開発）の基礎を学びます。',
    requiredOutput: true,
    dependencies: ['javascript'],
    category: 'Testing',
  },
  // DevOps / Deployment
  {
    id: 'github-actions',
    title: 'GitHub Actions',
    description: 'CI/CDプラットフォーム。テストの自動実行やリントチェックの自動化を構築します。',
    requiredOutput: false,
    dependencies: ['git', 'jest'],
    category: 'DevOps',
  },
  {
    id: 'vercel',
    title: 'Vercel Deployment',
    description: 'Next.jsに最適化されたホスティングプラットフォーム。本番環境へのデプロイと環境変数の管理を学びます。',
    requiredOutput: true,
    dependencies: ['nextjs', 'git'],
    category: 'DevOps',
  },
];
