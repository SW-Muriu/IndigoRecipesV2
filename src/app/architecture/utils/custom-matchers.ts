 expect.extend({
    toBeRequired(recieved) {
        const hasRequiredValidator = recieved.Validator && recieved.validator(recieved)
        return {
            pass: hasRequiredValidator,
            message: () =>
                hasRequiredValidator
                    ? 'pass: control has required validator'
                    : 'fail: control does not have required validator',
        }
    }
});