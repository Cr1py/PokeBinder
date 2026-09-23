# PokeBinder
 
My personal art portfolio for my painted Pokemon cards. Inspired by VaultX binders that people use to hold their Pokemon card collection, I wanted to make a similar looking digital binder to hold my art. I have a lot of card bulk from gambling too much, so I might as well improve my art skills and show it off LOL.
 
## What Does it Do??
 
1. Open the binder cover and the user transitioned into the binder pages.
2. Flip between pages by clicking a page corner.
3. Each page shows a 3x3 grid of card sleeves. Click a sleeve once to "pull" a card partway out, and click the top half of it again to inspect it in 3D, or the bottom half to slide it back in.
4. Inspecting a card opens a 3D viewing of the card that the user can interact with by dragging it to rotate.
5. A small Pokeball icon in the bottom corner lets the admin (me) log in and add new cards, which are automatically slotted into the next open spot in the binder.
Refreshing the page re-fetches the live binder state from the database, so cards persist across sessions and devices.

## Demo Images

<img width="3046" height="1640" alt="image" src="https://github.com/user-attachments/assets/492f4bf7-32aa-4294-b595-ef534d4fad07" />
<img width="3050" height="1654" alt="image" src="https://github.com/user-attachments/assets/b60f3b49-ed19-492c-9361-488946b09f04" />


 
## Tech stack & key dependencies
 
| Package | Purpose |
|---|---|
| `next` | App framework (App Router) |
| `react` | UI framework |
| `typescript` | Static typing across components, data layer, and types |
| `tailwindcss` | Styling, via `@theme inline` custom color tokens |
| `motion` (`motion/react`) | Cover-opening hinge animation, page-flip transitions, card sleeve pop-up/pop-in motion |
| `@react-three/fiber` | React renderer for Three.js, used for the 3D card viewer |
| `@react-three/drei` | Texture loading (`useTexture`) and 3D helper utilities |
| `three` | Underlying 3D engine: custom rounded-rect geometry, extruded card mesh, material-per-face rendering |
| `@supabase/supabase-js` | Postgres database, authentication, and file storage |
 
### Future To Do's
 
- Add a feature to me to reorder cards within in website, so i don't have to make changes within the SQL data to reorder the display.
- Add call delete so i can remove card data in app
 
## Project structure
 
```
src/
├── app/
│   └── page.tsx                       # Renders <Binder /> and the floating <AdminButton />
├── types/
│   └── card.ts                        # Card, BinderSlot, BinderPageData types + row-to-type mapper
├── lib/
│   ├── supabase.ts                    # Supabase client instance
│   ├── cardService.ts                 # fetchCards, addCard, deleteCard, uploadCardImage
│   └── binderService.ts               # fetchBinderPages, assignCardToNextSlot
├── components/
│   ├── binder/
│   │   ├── Binder.tsx                 # Top-level state: open/closed, current spread, fetched data
│   │   ├── BinderCover.tsx            # Clickable cover with hinge-open exit animation
│   │   ├── BinderPage.tsx             # Renders left/right static pages + orchestrates flips
│   │   ├── FlippingLeaf.tsx           # The single page mid-turn (front/back faces, shadow overlay)
│   │   ├── PageContent.tsx            # 3x3 grid of sleeves for a given page number
│   │   ├── PageCorner.tsx             # Clickable corner hotspots that trigger page turns
│   │   └── PageController.tsx         # Maps spread index -> left/right page numbers (book-style blank covers)
│   ├── sleeve/
│   │   └── CardSleeve.tsx             # Pop-up/pop-in sleeve interaction (select / deselect / inspect)
│   ├── card/
│   │   ├── CardViewer.tsx             # Full-screen modal hosting the 3D card
│   │   └── Card3D.tsx                 # Textured, draggable/rotatable 3D card mesh
│   └── admin/
│       ├── AddCard.tsx                # Upload front/back images, insert card, auto-assign slot
│       ├── AdminButton.tsx            # Pokeball icon: toggles login or signs out
│       ├── AuthContext.tsx            # Handles user authentication
│       └── Login.tsx                  # Email/password form, calls AuthContext.signIn
```
 
## Current workflow
 
**1. Data loading: `Binder.tsx`**
When `Binder` mounts, it calls `fetchCards()` and `fetchBinderPages()` at the same time and stores the results in state, along with loading and error flags. The total number of spreads is calculated from however many binder pages actually exist in the database, so the binder automatically grows as more cards are added.
 
**2. Opening the binder: `BinderCover.tsx`**
Clicking the cover does not remove it from the screen right away. `AnimatePresence` first plays a hinge-rotation exit animation, pivoting the cover around its left edge like a book opening. Once that animation finishes, `Binder` swaps in the page spread and widens the container to a two-page layout.
 
**3. Reading a spread: `BinderPage.tsx` and `PageController.ts`**
Each spread shows a left page and a right page, and which page numbers appear is calculated from the current spread index. The very first spread has a blank left page and the very last spread has a blank right page, so the binder mimics the inside covers of a real book.
 
**4. Turning pages: `PageCorner.tsx` and `FlippingLeaf.tsx`**
Clicking a page corner starts a single page rotating around the spine. Both the front and back of that page are rendered ahead of time, so nothing pops in or flashes partway through the turn. A shadow overlay also darkens as the page approaches edge on, then fades as it lays flat.
 
**5. Inspecting a card: `CardSleeve.tsx` to `CardViewer.tsx`**
Each of the nine sleeves on a page renders either a card or an empty placeholder. Clicking a card the first time pops it partway out of its sleeve. From there, clicking the top half of the card opens `CardViewer`, a full screen 3D scene. Clicking the bottom half instead slides the card back down into its sleeve.
 
**6. The 3D card: `Card3D.tsx`**
The card is built as a box mesh with a different material on each face. The four thin edges use a solid color, while the front and back faces use the card's real artwork, with support for transparent PNGs. Dragging the card rotates it, and releasing the mouse lets it settle in place.
 
**7. Admin add flow: `AdminButton.tsx` to `AddCard.tsx`**
Once signed in through `AuthContext`, an add card button appears next to the lock icon. Submitting the form uploads both the front and back images to Supabase Storage, adds a new row to the `cards` table, and then calls `assignCardToNextSlot`. That function finds the next open slot in `binder_slots`, or creates one if every existing slot is full, and links the new card to it. As a result, the card appears in the binder the next time it loads, with no manual database work required.
