import type { Metadata } from 'next';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ progress?: string }>;
}): Promise<Metadata> {
    const params = await searchParams;
    const progress = params.progress || '0';
    const url = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return {
        title: `ロードマップ進捗: ${progress}%`,
        description: 'エンジニアとして必要なスキルセットを効率的に習得するためのロードマップ管理ツール',
        openGraph: {
            title: `ロードマップ・チェッカー - ${progress}% 完了`,
            description: 'エンジニアとして必要なスキルセットを効率的に習得',
            images: [
                {
                    url: `${url}/api/og?progress=${progress}`,
                    width: 1200,
                    height: 630,
                    alt: `ロードマップ進捗: ${progress}%`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `ロードマップ・チェッカー - ${progress}% 完了`,
            description: 'エンジニアとして必要なスキルセットを効率的に習得',
            images: [`${url}/api/og?progress=${progress}`],
        },
    };
}

export default async function SharePage({
    searchParams,
}: {
    searchParams: Promise<{ progress?: string }>;
}) {
    const params = await searchParams;
    const progress = params.progress || '0';

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-600 to-indigo-700 dark:from-purple-900 dark:to-indigo-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    ロードマップ・チェッカー
                </h1>
                <div className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    {progress}%
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    完了しました！
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    エンジニアとして必要なスキルセットを効率的に習得
                </p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    ロードマップを見る
                </a>
            </div>
        </main>
    );
}
