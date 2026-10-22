# Sydney website prospects

Demo websites built for Sydney businesses that have no website or a broken one.
Each folder is a standalone static site (a single `index.html`) that can be deployed to Vercel as its own project.

## Leads

| Business | Suburb | Problem found | Phone | Email | Demo |
|---|---|---|---|---|---|
| Mr Poo Plumbing Works (owner: Michael) | Ingleburn | Listed site `mrpoo.com.au` doesn't resolve; 5.0★ (8 reviews) on Yellow Pages | 0417 271 270 | none listed | `mr-poo-plumbing/` |
| Gary Renouf Plumbing | Gladesville / North Ryde | Listed site `garyrenoufplumbing.com.au` doesn't resolve, despite 4.8★ from 118 reviews and trading since 1997 | 0418 265 530 | none listed | `gary-renouf-plumbing/` |
| Cafe The Beans | Dulwich Hill | No website at all, only a directory listing | (02) 8384 3076 | songfiona1@gmail.com | `cafe-the-beans/` |

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

Replace `<LINK>` with the Vercel URL and `<YOUR NAME>` / `<PRICE>` with your details. Send them from your own phone or email.

### Mr Poo Plumbing Works (SMS to 0417 271 270)

> Hi Michael, I'm <YOUR NAME>, a local web designer. I noticed mrpoo.com.au isn't loading, so customers searching for you online hit a dead end. Your reviews are great ("didn't charge like a wounded bull"!), so I built you a new site as a preview: <LINK>. It has click-to-call and a quote form that texts straight to your phone. If you'd like it live on your own domain, it's <PRICE>. Happy to change anything. Cheers!

### Gary Renouf Plumbing (SMS to 0418 265 530)

> Hi Gary, <YOUR NAME> here, a Sydney web designer. 118 reviews at 4.8★ is impressive, but garyrenoufplumbing.com.au is currently down, so Google searchers can't find you. I put together a free preview of a new site covering your plumbing and gutter work: <LINK>. It's mobile-friendly with one-tap calling and online booking requests. If you want it live, it's <PRICE>, and I can set it up on your existing domain. Let me know what you think!

### Cafe The Beans (email to songfiona1@gmail.com)

**Subject:** A free website preview for Cafe The Beans

> Hi Fiona,
>
> I'm <YOUR NAME>, a web designer based in Sydney. I noticed Cafe The Beans on Marrickville Road doesn't have a website yet, so people searching "cafe Dulwich Hill" on Google can't see your menu or opening hours.
>
> I built a preview of what your site could look like: <LINK>
>
> It has your menu, opening hours, a map with directions, and one-tap calling for takeaway orders, and it works well on phones. I'd just need your real menu, prices, hours and a few photos to finish it.
>
> If you'd like it live on your own domain (e.g. cafethebeans.com.au), it's <PRICE>, including setup. Happy to make any changes you'd like.
>
> Thanks,
> <YOUR NAME>
> <PHONE>
