// (c) Microsoft. All rights reserved

namespace CHBase.Foundation
{
    public interface IServiceDefinition
    {
        string LiveIdAuthPolicy { get; set; }
    }

    internal class ServiceDefinitionProxy : ServiceDefinition, IServiceDefinition
    {
    }

    public sealed class ServiceDefinitionFactory
    {
        public static IServiceDefinition CreateServiceDefinition()
        {
            return new ServiceDefinitionProxy();
        }
    }
}
