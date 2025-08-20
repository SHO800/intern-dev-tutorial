// import { serveDir,  } from '@std/http'
import { serveDir } from 'jsr:@std/http@^1.0.17'

/**
 * APIリクエストを処理する
 */
Deno.serve((req) => {
	// URLのパスを取得
	const pathname = new URL(req.url).pathname
	console.log(pathname)
	// パスが'/welcome-message'だったら「'jigインターンへようこそ！'」の文字を返す
	if (req.method === 'GET' && pathname === '/welcome-message') {
		return new Response('jig.jpインターンへようこそ！👍')
	}

	// publicフォルダ内にあるファイルを返す
    return new Response(Deno.cwd(), )
    // return new Response(Deno.readDirSync()
	return serveDir(req, {
		fsRoot: 'public',
		urlRoot: '',
		showDirListing: true,
		enableCors: true,
	})
})

