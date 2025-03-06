## [1.1.4] - 06-03-2025

### Added

- App PWA icon.

### Changed

- Changed the app name.
- Changed the width of the CTA-button on large screens, on the index page.

## [1.1.3] - 06-03-2025

### Fixed

- Another bug in the closing of bets, with division by zero, when there are no winners.

## [1.1.1] - 06-03-2025

### Fixed

- A bug in the urls, in the middleware redirections.

## [1.1.0] - 06-03-2025

### Changed

- useRecord now set empty date values to undefined.
- Bets pagination.

### Fixed

- The behaviour of the back button sometimes returning to the bet creation screen, when it was not supposed to.
- An error with the pool being a string, instead of a number, when closing a bet.

### Added

- Constraint on the bet dates, to disallow expiry on the same day they are created.

## [1.0.1] - 06-03-2025

### Changed

- Switched to using the default server instead of the custom one.
- Added the router as part of the callback deps in the login form's onSubmit.

### Fixed

- Zod validation being outside of the try-catch block in the register form onSubmit, causing obscure errors if one occured.
- The registration onSubmit not updating when the credentials are changed.

### Removed

- Console.log statement in the useEffect, inside the useRecord-hook, when the value changes.

## [1.0.0] - 05-03-2025

### Release

Version 1.0.0 is released, containing the bare-minimum features of the app:

- User registration and login
- Bet creation
- Bid placement
- Bet closure
