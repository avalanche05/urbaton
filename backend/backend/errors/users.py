class PhoneAlreadyAssociatedError(Exception):
    def __init__(self, message="Phone with this phone number already registered"):
        super().__init__(self, message)


class AuthenticationError(Exception):
    def __init__(self, message="Invalid credentials"):
        self.message = message
        super().__init__(self.message)


class UserNotFoundError(Exception):
    def __init__(self, message="User not found"):
        self.message = message
        super().__init__(self.message)


class InsufficientFundsError(Exception):
    def __init__(self, message="Insufficient funds"):
        self.message = message
        super().__init__(self.message)
