---
name: New API Endpoint
about: Request or propose a new API endpoint
title: '[API] '
labels: api, enhancement
assignees: ''
---

## Endpoint Details
- **Method**: GET | POST | PUT | DELETE
- **Path**: `/api/...`
- **Auth Required**: Yes | No

## Purpose
What does this endpoint do?

## Request Format
```json
{
  "field": "value"
}
```

## Response Format
```json
{
  "data": "value"
}
```

## Validation Rules
What should be validated?

## Error Responses
Expected error cases and status codes.

## Related Models
Which Mongoose models are involved?

## Middleware Required
- [ ] `validateToken`
- [ ] `allowRoot`
- [ ] Custom middleware: 

## Additional Notes
Any other implementation details.
