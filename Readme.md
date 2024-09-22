# Requirements

- Create Account
- Login
- Update your profile
- Feed Page - expolore
- Send Connection's Request
- See Matches
- See Requests we have sent/receive
- Update Profile

# Tech stack

- FE: React
- BE: Node JS
- DB: Mongo

# DB Design and API Design are imp

- DB Design(Mongo)

  - User Collection
    - User name
    - last name
    - pwd
    - gender
  - Connect Request Collection
  - From User ID
  - To User ID
  - status : pending,rejected or accepted, can also be cancelled/ignored

- API Design
- /signup -post API
- /signin -post API
- /profile -get API
- /profile -post API
- /profile -patch API
- /profile -delete API
- /sendRequest
  - ignore
  - interested
- /reviewRequest
  - accept
  - rejected
- /request

# Basic Folder Structures

- package.json
- ^ carot ^x.y.z

  - x: represent major version :: This is a mjor update innthe package and can lead to breaking of code as major updates gen tend to not support backward compatibility.
  - y: represent minor version :: could be bug fix,new feature and it is safe to update this minor version as it will have backward compatibility.
  - z: represent patch : patch could be bug fix and safe to update this patch as it will have backward compatibility.
  - If no ^ and ~ , then package will never auto update
  - ^ & ~ : ^carrot will auto update package in case of minor and patch upgrades,~tilda will update only the patches and not the major and minor.

- package-lock.json
  - This has the exact version installed and also it is a snapshot of all the node_modeules dependencies
