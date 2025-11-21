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
      { title: 'MDN Web Docs - Web開発を学ぶ', url: 'https://developer.mozilla.org/ja/docs/Learn' },
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
    tutorials: [
      { title: 'MDN Web Docs - JavaScript', url: 'https://developer.mozilla.org/ja/docs/Web/JavaScript' },
      { title: 'JavaScript.info (日本語)', url: 'https://ja.javascript.info/' },
    ],
    children: [
      {
        id: 'js-basics',
        title: 'Basic Syntax',
        description: '変数、データ型、演算子、制御構文（if, for, while）などの基礎文法。',
        requiredOutput: false,
        dependencies: [],
        category: 'Language',
      },
      {
        id: 'dom-manipulation',
        title: 'DOM Manipulation',
        description: 'JavaScriptを使用してHTML要素を取得・変更・作成する方法。イベントリスナーの扱い。',
        requiredOutput: false,
        dependencies: ['js-basics'],
        category: 'Language',
      },
      {
        id: 'async-js',
        title: 'Asynchronous JavaScript',
        description: '非同期処理の概念。Callback, Promise, async/awaitの使い方とFetch APIによるデータ取得。',
        requiredOutput: false,
        dependencies: ['dom-manipulation'],
        category: 'Language',
      },
      {
        id: 'es6-plus',
        title: 'ES6+ Features',
        description: 'モダンJavaScriptの機能。アロー関数、分割代入、スプレッド構文、モジュール（import/export）。',
        requiredOutput: false,
        dependencies: ['js-basics'],
        category: 'Language',
      },
    ],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'JavaScriptに静的型付けを加えたスーパーセット。大規模開発に必須の型安全性を学びます。',
    requiredOutput: false,
    dependencies: ['javascript'],
    category: 'Language',
    tutorials: [
      { title: 'TypeScript Official Documentation', url: 'https://www.typescriptlang.org/docs/' },
      { title: 'TypeScript Deep Dive (日本語版)', url: 'https://typescript-jp.gitbook.io/deep-dive/' },
    ],
    children: [
      {
        id: 'ts-basics',
        title: 'Basic Types',
        description: 'プリミティブ型、配列、オブジェクトの型定義。型推論と型注釈。',
        requiredOutput: false,
        dependencies: [],
        category: 'Language',
      },
      {
        id: 'interfaces-types',
        title: 'Interfaces & Type Aliases',
        description: 'カスタム型の定義。インターフェースと型エイリアスの違いと使い分け。',
        requiredOutput: false,
        dependencies: ['ts-basics'],
        category: 'Language',
      },
      {
        id: 'generics',
        title: 'Generics',
        description: 'ジェネリクスを使用した再利用可能なコンポーネントや関数の作成。',
        requiredOutput: false,
        dependencies: ['interfaces-types'],
        category: 'Language',
      },
    ],
  },
  // Tooling
  {
    id: 'git',
    title: 'Git & GitHub',
    description: 'バージョン管理システム。コードの変更履歴を記録し、チーム開発の基礎を身につけます。',
    requiredOutput: false,
    dependencies: ['html-css'],
    category: 'Tooling',
    tutorials: [
      { title: 'Git - Documentation', url: 'https://git-scm.com/doc' },
      { title: 'GitHub Skills', url: 'https://skills.github.com/' },
    ],
    children: [
      {
        id: 'git-basics',
        title: 'Basic Commands',
        description: 'init, add, commit, status, logなどの基本コマンド。',
        requiredOutput: false,
        dependencies: [],
        category: 'Tooling',
      },
      {
        id: 'branching-merging',
        title: 'Branching & Merging',
        description: 'ブランチの作成、切り替え、マージ。コンフリクトの解消方法。',
        requiredOutput: false,
        dependencies: ['git-basics'],
        category: 'Tooling',
      },
      {
        id: 'remote-repositories',
        title: 'Remote Repositories',
        description: 'GitHubなどのリモートリポジトリとの連携。push, pull, clone, fork。',
        requiredOutput: false,
        dependencies: ['branching-merging'],
        category: 'Tooling',
      },
    ],
  },
  // Framework (Frontend)
  {
    id: 'react',
    title: 'React',
    description: 'ユーザーインターフェースを構築するためのJavaScriptライブラリ。コンポーネント指向、State管理を学びます。',
    requiredOutput: true,
    dependencies: ['javascript', 'git'],
    category: 'Framework',
    tutorials: [
      { title: 'React 公式ドキュメント', url: 'https://ja.react.dev/' },
    ],
    children: [
      {
        id: 'components-props',
        title: 'Components & Props',
        description: '関数コンポーネントの作成とPropsによるデータの受け渡し。JSXの構文。',
        requiredOutput: false,
        dependencies: [],
        category: 'Framework',
      },
      {
        id: 'state-hooks',
        title: 'State & Hooks',
        description: 'useState, useEffectなどの基本フック。コンポーネントの状態管理とライフサイクル。',
        requiredOutput: false,
        dependencies: ['components-props'],
        category: 'Framework',
      },
      {
        id: 'context-api',
        title: 'Context API',
        description: 'グローバルな状態管理。Propsバケツリレーの回避。',
        requiredOutput: false,
        dependencies: ['state-hooks'],
        category: 'Framework',
      },
    ],
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    description: 'Reactベースのフルスタックフレームワーク。SSR/SSG、ルーティング、APIルートなどを学びます。',
    requiredOutput: true,
    dependencies: ['react', 'typescript'],
    category: 'Framework',
    tutorials: [
      { title: 'Next.js Documentation', url: 'https://nextjs.org/docs' },
      { title: 'Next.js Learn', url: 'https://nextjs.org/learn' },
    ],
    children: [
      {
        id: 'app-router',
        title: 'App Router',
        description: 'ファイルシステムベースのルーティング。Layouts, Pages, Loading UI, Error Handling。',
        requiredOutput: false,
        dependencies: [],
        category: 'Framework',
      },
      {
        id: 'rendering',
        title: 'Rendering (SSR/CSR)',
        description: 'Server ComponentsとClient Componentsの使い分け。静的レンダリングと動的レンダリング。',
        requiredOutput: false,
        dependencies: ['app-router'],
        category: 'Framework',
      },
      {
        id: 'data-fetching',
        title: 'Data Fetching',
        description: 'fetch APIを使用したデータ取得。Caching, Revalidating。',
        requiredOutput: false,
        dependencies: ['rendering'],
        category: 'Framework',
      },
    ],
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    description: 'ユーティリティファーストのCSSフレームワーク。迅速なスタイリングとデザインシステムの実装を学びます。',
    requiredOutput: false,
    dependencies: ['html-css'],
    category: 'Tooling',
    tutorials: [
      { title: 'Tailwind CSS Documentation', url: 'https://tailwindcss.com/docs' },
    ],
    children: [
      {
        id: 'utility-first',
        title: 'Utility-First Concept',
        description: 'ユーティリティクラスを使用したスタイリングの基本概念。',
        requiredOutput: false,
        dependencies: [],
        category: 'Tooling',
      },
      {
        id: 'responsive-modifiers',
        title: 'Responsive Design',
        description: 'sm:, md:, lg: などのプレフィックスを使用したレスポンシブデザインの実装。',
        requiredOutput: false,
        dependencies: ['utility-first'],
        category: 'Tooling',
      },
      {
        id: 'customization',
        title: 'Configuration & Theme',
        description: 'tailwind.config.jsを使用したテーマのカスタマイズ（カラー、フォント、ブレークポイント）。',
        requiredOutput: false,
        dependencies: ['responsive-modifiers'],
        category: 'Tooling',
      },
    ],
  },
  // Backend
  {
    id: 'nodejs',
    title: 'Node.js API',
    description: 'サーバーサイドJavaScriptランタイム。Next.jsのAPI RoutesまたはExpressを用いてREST API構築を学びます。',
    requiredOutput: true,
    dependencies: ['javascript'],
    category: 'Backend',
    tutorials: [
      { title: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/' },
    ],
    children: [
      {
        id: 'node-basics',
        title: 'Node.js Runtime',
        description: '非同期I/O、イベントループ、npm/yarnによるパッケージ管理。',
        requiredOutput: false,
        dependencies: [],
        category: 'Backend',
      },
      {
        id: 'rest-api',
        title: 'REST API Design',
        description: 'リソース指向のAPI設計。HTTPメソッド（GET, POST, PUT, DELETE）とステータスコード。',
        requiredOutput: false,
        dependencies: ['node-basics'],
        category: 'Backend',
      },
    ],
  },
  // Database
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: '堅牢なオープンソースのリレーショナルデータベース。SQLの基礎とデータモデリングを学びます。',
    requiredOutput: false,
    dependencies: ['nodejs'],
    category: 'Database',
    tutorials: [
      { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/' },
    ],
    children: [
      {
        id: 'sql-basics',
        title: 'SQL Basics',
        description: 'SELECT, INSERT, UPDATE, DELETEなどの基本クエリ。WHERE句によるフィルタリング。',
        requiredOutput: false,
        dependencies: [],
        category: 'Database',
      },
      {
        id: 'relational-model',
        title: 'Relational Model',
        description: 'テーブル設計、主キー、外部キー、正規化の概念。',
        requiredOutput: false,
        dependencies: ['sql-basics'],
        category: 'Database',
      },
    ],
  },
  {
    id: 'prisma',
    title: 'Prisma',
    description: '次世代ORM。型安全なデータベースアクセスとマイグレーション管理を学びます。',
    requiredOutput: true,
    dependencies: ['postgresql', 'typescript'],
    category: 'Database',
    tutorials: [
      { title: 'Prisma Documentation', url: 'https://www.prisma.io/docs' },
    ],
    children: [
      {
        id: 'prisma-schema',
        title: 'Prisma Schema',
        description: 'schema.prismaファイルでのデータモデル定義。',
        requiredOutput: false,
        dependencies: [],
        category: 'Database',
      },
      {
        id: 'prisma-client',
        title: 'Prisma Client',
        description: '型安全なデータベースクエリの実行。CRUD操作。',
        requiredOutput: false,
        dependencies: ['prisma-schema'],
        category: 'Database',
      },
    ],
  },
  // Testing
  {
    id: 'jest',
    title: 'Jest / Vitest',
    description: 'JavaScriptテストフレームワーク。単体テストの書き方とTDD（テスト駆動開発）の基礎を学びます。',
    requiredOutput: true,
    dependencies: ['javascript'],
    category: 'Testing',
    tutorials: [
      { title: 'Jest Documentation', url: 'https://jestjs.io/docs/getting-started' },
    ],
    children: [
      {
        id: 'unit-testing',
        title: 'Unit Testing Basics',
        description: 'テストの構造（describe, test, expect）。基本的なマッチャーの使用方法。',
        requiredOutput: false,
        dependencies: [],
        category: 'Testing',
      },
      {
        id: 'mocking',
        title: 'Mocking',
        description: '外部依存（APIコールなど）のモック化。jest.fn(), jest.spyOn()。',
        requiredOutput: false,
        dependencies: ['unit-testing'],
        category: 'Testing',
      },
    ],
  },
  // DevOps / Deployment
  {
    id: 'github-actions',
    title: 'GitHub Actions',
    description: 'CI/CDプラットフォーム。テストの自動実行やリントチェックの自動化を構築します。',
    requiredOutput: false,
    dependencies: ['git', 'jest'],
    category: 'DevOps',
    tutorials: [
      { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions' },
    ],
    children: [
      {
        id: 'workflows',
        title: 'Workflows & YAML',
        description: '.github/workflowsディレクトリへのYAMLファイル定義。トリガー（push, pull_request）の設定。',
        requiredOutput: false,
        dependencies: [],
        category: 'DevOps',
      },
      {
        id: 'ci-pipeline',
        title: 'CI Pipeline',
        description: 'ビルド、テスト、リントを自動実行するジョブの作成。',
        requiredOutput: false,
        dependencies: ['workflows'],
        category: 'DevOps',
      },
    ],
  },
  {
    id: 'vercel',
    title: 'Vercel Deployment',
    description: 'Next.jsに最適化されたホスティングプラットフォーム。本番環境へのデプロイと環境変数の管理を学びます。',
    requiredOutput: true,
    dependencies: ['nextjs', 'git'],
    category: 'DevOps',
    tutorials: [
      { title: 'Vercel Documentation', url: 'https://vercel.com/docs' },
    ],
    children: [
      {
        id: 'deployment',
        title: 'Deployment',
        description: 'GitHubリポジトリとの連携による自動デプロイ。プレビュー環境の活用。',
        requiredOutput: false,
        dependencies: [],
        category: 'DevOps',
      },
      {
        id: 'env-vars',
        title: 'Environment Variables',
        description: '環境変数の設定と管理。開発環境と本番環境の使い分け。',
        requiredOutput: false,
        dependencies: ['deployment'],
        category: 'DevOps',
      },
    ],
  },
];
