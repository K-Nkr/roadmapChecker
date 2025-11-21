import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const progress = searchParams.get('progress') || '0';

        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontFamily: 'system-ui, sans-serif',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '60px',
                            background: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '24px',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '72px',
                                fontWeight: 'bold',
                                margin: '0 0 20px 0',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            ロードマップ・チェッカー
                        </h1>
                        <div
                            style={{
                                fontSize: '120px',
                                fontWeight: 'bold',
                                color: '#667eea',
                                marginBottom: '20px',
                            }}
                        >
                            {progress}%
                        </div>
                        <p
                            style={{
                                fontSize: '32px',
                                color: '#666',
                                margin: '0',
                            }}
                        >
                            完了しました！
                        </p>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e) {
        console.error(e);
        return new Response(`Failed to generate image`, {
            status: 500,
        });
    }
}
