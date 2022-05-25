import Document, {Html, Head, Main, NextScript} from "next/document"
export default class CustomDocument extends Document{
    render()
    {
        console.log('Hello from document');
        
        return(
            <Html>
            <Head>
                <meta property="custom " content="yolo..."></meta>
            </Head>

            <body>
                <Main/>
            </body>
            <NextScript/>
        </Html>

        )       
    }
}