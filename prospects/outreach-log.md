# Outreach log

One row per business. Check this before contacting anyone, so nobody is contacted twice.
Status: `built`, `emailed`, `sms-needed` (no public email, so the owner has to text them), `replied`, `won`, `declined`, `unsubscribed`.

| Date | Business | Folder | Live demo | Channel | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-10-22 | Cafe The Beans, Dulwich Hill | cafe-the-beans | https://cafe-the-beans.vercel.app | email songfiona1@gmail.com | emailed | Quoted $350 one-off or $150 + $20/mo |
| 2026-10-22 | Mr Poo Plumbing Works, Ingleburn | mr-poo-plumbing | https://mr-poo-plumbing.vercel.app | SMS 0417 271 270 | texted | First text wrongly said mrpoo.com.au was down. It's live, just a bare GoDaddy page with a contact form. Correction text in README |
| 2026-10-22 | Gary Renouf Plumbing, Gladesville | gary-renouf-plumbing | https://gary-renouf-plumbing.vercel.app | SMS 0418 265 530 | declined | NOT A LEAD: garyrenoufplumbing.com.au is a working, full site. Apology text in README. Don't contact again |
| 2026-10-22 | Surry Cutters, Surry Hills | surry-cutters | https://surry-cutters.vercel.app | email surrycutters@bigpond.com | emailed | No website (no DNS for surrycutters.com.au) |
| 2026-10-22 | M V Motors, Liverpool | mv-motors | https://mv-motors-rho.vercel.app | email mvmotors.Liverpool@gmail.com | emailed | No website (no DNS for mvmotors.com.au) |
| 2026-10-22 | Tapered The Barbershop, Quakers Hill | tapered-the-barbershop | https://tapered-the-barbershop.vercel.app | email taperedthebarbershop@gmail.com | emailed | Instagram only (@taperedthebarbershop) |

## Skipped after checking
- Autocure Mobile Mechanics: has autocuremobilemechanics.com.au
- Sydney Electrical And Maintenance: has sydneyelectricalmaintenance.com.au
- Barber's Deluxe: has barbersdeluxe.com.au

## How to check whether a site is dead
Don't trust a failed `curl` from the sandbox: the egress proxy refuses some hosts, which looks the same as a dead site.
Use DNS (`https://dns.google/resolve?name=<domain>`; Status 3 means the domain doesn't exist) and confirm with WebFetch.

## Batch 3: 2026-10-22
| Date | Business | Folder | Live demo | Channel | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-10-22 | Caveman Barbers, Hunter Connection 109 Pitt St (CBD) | caveman-barbers | https://caveman-barbers.vercel.app | email admin@cavemanbarbers.com.au | emailed | Requested by the user. Has a WordPress site, but About Us is lorem ipsum, there's no Call/Book button on the mobile homepage, and it takes 5s+ to load (90 requests). Premium animated redesign; links to their SimplyBook page |

## Upgrades
- 2026-10-22: added animations to every active demo (scroll reveals, animated hero, progress bar, card tilt, button shine) plus one interactive feature each: Mr Poo problem checker, Cafe order-ahead cup builder, Surry Cutters "find your look" quiz, M V Motors warning-light decoder, Tapered fade visualiser. Redeployed to the same URLs.

## Batch 4: 2026-10-22 (all have a mobile, so email + SMS)
| Date | Business | Folder | Live demo | Channel | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-10-22 | Electrical Works Sydney (Samy), West Ryde | electrical-works-sydney | https://electrical-works-sydney.vercel.app | email electricalworkssydney@hotmail.com + SMS 0433 975 175 | emailed, sms-pending | Their domain is parked "for sale". 5.0★ (4). Interactive job planner |
| 2026-10-22 | Diamond Star Painters, Prestons | diamond-star-painters | https://diamond-star-painters.vercel.app | email diamondstarpainters@gmail.com + SMS 0422 802 504 | emailed, sms-pending | No website. 5.0★ (6). Room colour visualiser |
| 2026-10-22 | Barkers Grooming and Dog Washing, West Pymble | barkers-grooming | https://barkers-grooming.vercel.app | email thompsongrooming@gmail.com + SMS 0430 245 309 | emailed, sms-pending | No website (barkersgrooming.com.au is an unrelated Brisbane business). Home-based, so the street address is hidden on the site. Groom finder |
| 2026-10-22 | Christina's Salon Styling, Bankstown | christinas-salon | https://christinas-salon.vercel.app | email xristinaklioti@gmail.com + SMS 0451 113 959 | emailed, sms-pending | No website. Occasion style finder + countdown |

Skipped: Atlantic Painting, Bexley. atlanticpainting.com.au already holds another web designer's "sample layout for client demonstration".

## Batch 5: 2026-10-22 (all have a mobile, so email + SMS)
| Date | Business | Folder | Live demo | Channel | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-10-22 | Babylon Fadez, Casula | babylon-fadez | https://babylon-fadez-omega.vercel.app | email babylonfadez@gmail.com + SMS 0435 000 357 | emailed, sms-pending | No web presence. Fade builder |
| 2026-10-22 | Bubbles Blow Dry & Clip (Sandra), Carlton | bubbles-dog-grooming | https://bubbles-dog-grooming-cyan.vercel.app | email sandrathomson15@yahoo.com + SMS 0435 517 840 | DRAFT in Gmail (auto-send was blocked), sms-pending | Old site bubblesblowdryandclip.com.au no longer exists. Pamper journey |
| 2026-10-22 | Nikki's Beauty Bar, Croydon | nikkis-beauty-bar | https://nikkis-beauty-bar.vercel.app | email nikkisbeautybar01@gmail.com + SMS 0449 121 203 | emailed, sms-pending | Only has a Heygoldie booking page (nikkisbeautybar.com is a Canadian salon). Lash styler; address hidden |
| 2026-10-22 | Roadmaster Mechanics, Wetherill Park | roadmaster-mechanics | https://roadmaster-mechanics.vercel.app | ~~email saadabosh@yahoo.com~~ BOUNCED (address not found) + SMS 0401 380 856 | sms only | No website. Service-due gauge |

Skipped: Roll On Automotive. rollonautomotive.com.au shows a different address, phone and contact, so the identity is unclear.

## Batch 6: 2026-10-22 (mobile + email)
| Date | Business | Folder | Live demo | Channel | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-10-22 | Hunters Hill Barber Shop | hunters-hill-barber-shop | https://hunters-hill-barber-shop.vercel.app | email sam2412@hotmail.com + SMS 0424 180 545 | emailed, sms-pending | No website. Beard designer |
| 2026-10-22 | Instyle Hair Cuts, Kingsgrove | instyle-hair-cuts | https://instyle-hair-cuts.vercel.app | email instylehaircuts@live.com.au + SMS 0402 449 000 | emailed, sms-pending | Fresha listing only. Cut finder |
| 2026-10-22 | Ace Mowing and Edges, Padstow Heights | ace-mowing-and-edges | https://ace-mowing-and-edges.vercel.app | email acemowingandedges@gmail.com + SMS 0420 612 144 | emailed, sms-pending | No website. Lawn planner with mower animation; home address hidden |

Skipped: AS Mechanical Repairs (1★ "rip-off" review). Balmain Plumbing (balmainplumbing.com.au has a different phone, so the identity is unclear). Your Local Painter (generic name, domains taken).

## SMS outbox
A phone page with one-tap "Text" buttons (sms: links pre-filled with number + message), call buttons for landlines, and sent tracking.
The URL is unlisted (noindex); it was shared with the owner in chat. Not committed here because it holds the full contact list.

## Batch 7: 2026-10-22 (mobile + email)
| Date | Business | Folder | Live demo | Channel | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-10-22 | Theiss Electrical (Steve), Jamisontown/Penrith | theiss-electrical | https://theiss-electrical.vercel.app | email theisselectrical@outlook.com + SMS 0432 067 738 | emailed, sms-pending | 4.96★ (28), no website. LED savings calculator |
| 2026-10-22 | Kingz Barber, 40 Enmore Rd Newtown | kingz-barber-newtown | https://kingz-barber-newtown.vercel.app | email kingzbarber.newtown@gmail.com + SMS 0449 933 188 | emailed, sms-pending | kingzbarber.com is only a "KING'Z" placeholder of unknown ownership. Next-cut countdown + .ics reminder |
| 2026-10-22 | Woods Plumbing, Cromer | woods-plumbing | https://woods-plumbing-omega.vercel.app | email woods.plumbing@hotmail.com + SMS 0403 218 290 | emailed, sms-pending | woodsplumbing.com.au returns a Cloudflare 522 error; ownership unconfirmed, so the email only says "couldn't find a working website". Hot water health check |
| 2026-10-22 | Beauty Room by Mel, Cherrybrook | beauty-room-by-mel | https://beauty-room-by-mel.vercel.app | email beautyroombymel@outlook.com.au + SMS 0401 123 448 | emailed, sms-pending | Home-based, address hidden. Treatment finder |

All batch 1–6 SMS/calls were marked done in the outbox at the owner's request.
