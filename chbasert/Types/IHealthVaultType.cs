// (c) Microsoft. All rights reserved

namespace CHBase.Types
{
    public interface IHealthVaultType
    {
        void Validate();
    }

    public interface IHealthVaultTypeSerializable : IHealthVaultType
    {
        string Serialize();
    }
}