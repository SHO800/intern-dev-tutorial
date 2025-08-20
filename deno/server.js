// import { serveDir,  } from '@std/http'
import { serveDir } from 'jsr:@std/http@^1.0.17'

/**
 * APIリクエストを処理する
 */
Deno.serve(async (req) => {
	// URLのパスを取得
	const pathname = new URL(req.url).pathname
	// console.log(pathname)
	// パスが'/welcome-message'だったら「'jigインターンへようこそ！'」の文字を返す
	if (req.method === 'GET' && pathname === '/welcome-message') {
		return new Response('jig.jpインターンへようこそ！👍')
	}

	// publicフォルダ内にあるファイルを返す
    // return new Response(Deno.cwd(), )
    const cwd = Deno.cwd()
    console.log('Current working directory:', cwd)
    const files = []
    for await (const file of Deno.readDir(cwd)) {
        files.push(file.name)
    }
    console.log('Files in cwd:', files)
        
    
    // htmlで返す
    return new Response( `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jig.jpインターン</title>
</head>
<body>
    <h1>jig.jpインターンへようこそ！</h1>
    <p>現在の作業ディレクトリ: ${cwd}</p>
    <p>ファイル一覧:</p>
    <ul>
        ${files.map(file => `<li>${file}</li>`).join('')}
    </ul>
</body>
</html>
`, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        },
    })
    
    
    
	// return serveDir(req, {
	// 	fsRoot: 'public',
	// 	urlRoot: '',
	// 	showDirListing: true,
	// 	enableCors: true,
	// })
})
