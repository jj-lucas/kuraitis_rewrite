const hasPermissions = (ctx, eligiblePermissions) => {
	if (!ctx.req.userId) {
		throw new Error('You must be logged in to do this')
	}
	const hasPermission = ctx.req.user.permissions
		.map(permission => permission.name)
		.some(permission => eligiblePermissions.includes(permission))
	if (!hasPermission) {
		throw new Error("You don't have permission to do this")
	}
}

module.exports = hasPermissions
