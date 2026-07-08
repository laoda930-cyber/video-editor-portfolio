export default function Header({ categories }) {
  return <header className="site-header"><a className="brand" href="#featured" aria-label="返回精选作品"><span>LXX</span><span><b>李欣霞</b><small>VIDEO EDITOR</small></span></a><nav aria-label="作品分类">{categories.map((category) => <a key={category.id} href={`#${category.id}`}>{category.name}</a>)}</nav><a className="header-contact" href="mailto:1888888888@qq.com">联系</a></header>
}
