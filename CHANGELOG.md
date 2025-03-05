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
