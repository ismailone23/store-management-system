interface Props {
    seoTitle: string;
}

export default function Metadata({ seoTitle }: Props) {
    return (
        <>
            <title>{seoTitle}</title>
            <meta name="description" content={'"Shop Management System, Invoices , Users for controlling app, Shop to manage products and their stocks,POS System"'} />
        </>
    );
}
