# Sydney website prospects

Demo websites built for Sydney businesses that have no website or a broken one.
Each folder is a standalone static site (a single `index.html`) that can be deployed to Vercel as its own project.

## Leads

| Business | Suburb | Problem found | Phone | Email | Demo |
|---|---|---|---|---|---|
| Mr Poo Plumbing Works (owner: Michael) | Ingleburn | `mrpoo.com.au` is a bare GoDaddy page (contact form only: no services, phone or reviews); 5.0★ (8 reviews) on Yellow Pages | 0417 271 270 | none listed | [mr-poo-plumbing.vercel.app](https://mr-poo-plumbing.vercel.app) |
| ~~Gary Renouf Plumbing~~ | Gladesville / North Ryde | **Not a lead.** `garyrenoufplumbing.com.au` is a working, full site; the first check was a false negative | 0418 265 530 | none listed | [gary-renouf-plumbing.vercel.app](https://gary-renouf-plumbing.vercel.app) |
| Surry Cutters | Surry Hills | No website | (02) 9318 2413 | surrycutters@bigpond.com | [surry-cutters.vercel.app](https://surry-cutters.vercel.app) |
| M V Motors | Liverpool | No website | (02) 9734 9847 | mvmotors.Liverpool@gmail.com | [mv-motors-rho.vercel.app](https://mv-motors-rho.vercel.app) |
| Tapered The Barbershop | Quakers Hill | Instagram only | (02) 9837 1399 | taperedthebarbershop@gmail.com | [tapered-the-barbershop.vercel.app](https://tapered-the-barbershop.vercel.app) |
| Cafe The Beans | Dulwich Hill | No website at all, only a directory listing | (02) 8384 3076 | songfiona1@gmail.com | [cafe-the-beans.vercel.app](https://cafe-the-beans.vercel.app) |

Other leads with no website listed, not built yet: Spot On Plumbing Services, Marrickville (spotonservices@optusnet.com.au, 0414 588 766), and LADY BOSS HAIR, Newtown ((02) 8034 1956).

Sources: the Yellow Pages listing for each business (contact details, reviews), Oneflare (listed website domains), and the ABN register. The domain checks were run on 22 Oct 2026.

## What each demo includes

- A mobile-first layout with a sticky "Call now" bar on phones
- Click-to-call buttons and a quote/booking form that opens a pre-filled SMS to the owner
- Real customer reviews, quoted with attribution
- Services, service areas, and FAQ or opening hours
- SEO title and description tags and schema.org `LocalBusiness` data, so the business can appear in Google rich results
- Cafe only: a menu section, an embedded Google Map and a directions link. The menu prices and opening hours are placeholders until the owner supplies them.

## Deploy to Vercel

For each folder:

```bash
cd prospects/<folder>
npx vercel deploy --prod --yes   # needs `vercel login` or VERCEL_TOKEN
```

Or in the Vercel dashboard, go to **Add New → Project**, import this repo, and set **Root Directory** to `prospects/<folder>` with Framework Preset set to **Other**.
Rename each project to something like `mr-poo-plumbing` so the URL reads `mr-poo-plumbing.vercel.app`.

## Outreach messages

Sender: **Vvh solutions** (akrishhbali2023@gmail.com).
Pricing: **$350 one-off** for the full site on the business's own domain, or **$150 upfront + $20/month** including hosting and maintenance.
Replace `<LINK>` with the deployed demo URL.
Every email names the sender and includes an opt-out line, as the Australian Spam Act 2003 requires.

### Mr Poo Plumbing Works (SMS to 0417 271 270)

> Hi Michael, it's Vvh solutions, a Sydney web design studio. mrpoo.com.au isn't loading at the moment, so customers who search for you hit a dead end. We built you a new site as a free preview: <LINK>. It has tap-to-call and a quote form that texts straight to your phone. To keep it, it's $350 one-off, or $150 + $20/month with hosting and updates included. Reply STOP to opt out.

### Gary Renouf Plumbing (SMS to 0418 265 530)

> Hi Gary, it's Vvh solutions, a Sydney web design studio. 118 reviews at 4.8★ is impressive, but garyrenoufplumbing.com.au is currently down. We built a free preview of a new site covering your plumbing and gutter work: <LINK>. It's $350 one-off, or $150 + $20/month with hosting and maintenance included, and we can put it on your existing domain. Reply STOP to opt out.

### Cafe The Beans (email to songfiona1@gmail.com)

**Subject:** We built a free website preview for Cafe The Beans

> Hi there,
>
> We're Vvh solutions, a small web design studio in Sydney. We noticed Cafe The Beans on Marrickville Road doesn't have a website yet, so people searching "cafe Dulwich Hill" can't find your menu or opening hours.
>
> We built you a preview: <LINK>
>
> It includes your menu, opening hours, a map with directions and one-tap calling for takeaway orders, and it works well on phones.
>
> Quote:
> - Option 1: $350 one-off. Full website on your own domain (e.g. cafethebeans.com.au), with your real menu, prices and photos.
> - Option 2: $150 upfront + $20/month. Same website, plus hosting, updates and menu changes whenever you need them.
>
> Just reply to this email to go ahead or ask for changes.
>
> Cheers,
> Vvh solutions
> akrishhbali2023@gmail.com
>
> If you'd rather not hear from us, reply "unsubscribe" and we won't contact you again.
