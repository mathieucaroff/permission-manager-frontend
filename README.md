# Admin Permission Mangement Frontend

## Ability

- [ ] Add users to groups (via drag-n-drop)
- [ ] Remove users from group
- [ ] Search users
- [ ] Search groups
- [ ] View user profile
- [ ] List groups members

## Dependencies

- material-ui (core, icons)
- parcel
- react
- react-dom
- recoil
- rxjs

## Composants

### Practical components

- User set
  - ~~User card~~ -- let's use directly a generic card
- User details
  - Shows the filtered set of group the user is part of
    - Uses group cards
      - Group cards must have the "unlink" action
- Group set
  - ~~Group card~~ -- let's use directly the generic card
- Group details
  - Shows the filtered set of users belonging to the group
    - Uses user cards
      - User cards must have the "unlink" action

### Higher order components

- Filterable set

## Todolist / priorities

- [v] User/Group set (with cards)
- [v] User/Group detail view

- [] Add `type` fields to User and Group
  - [] Make things more object-oriented

## Todo not too soon

- [] Find out a way to put the drag handle to the right
